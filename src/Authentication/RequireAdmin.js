import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axiosBicycle from '../api/axiosBicycle';
import Loading from '../Components/Loading/Loading';
import auth from '../Firebase/firebase.init';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            axiosBicycle(`/user/${user.email}`).then(res => {
                if (!res.data.admin) {
                    navigate('/');
                }
            }).catch(err => {
                if (err?.response?.status === 403 || err?.response?.status === 401) {
                    signOut(auth);
                    <Navigate to="/login" state={{ from: location }} replace />;
                }
            })
        }
    }, [user, location, navigate])

    if (loading) {
        return <div className='min-h-screen'>
            <Loading></Loading>
        </div>
    }

    if (!user) {
        <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAdmin;