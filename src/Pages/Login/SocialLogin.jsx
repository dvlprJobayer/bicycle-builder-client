import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import auth from '../../Firebase/firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../../Components/Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import axiosBicycle from '../../api/axiosBicycle';

const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [token, tokenLoading] = useToken(user);

    if (user) {
        axiosBicycle.put(`/user?email=${user.user.email}`, {
            name: user.user.displayName
        }).then(res => {
            console.log(res.data);
        })
    }

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    if (loading || tokenLoading) {
        return <div className="min-h-screen">
            <Loading></Loading>
        </div>
    }

    return (
        <>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>
            </div>
            <button onClick={() => signInWithGoogle()} className='btn btn-primary btn-outline'><FcGoogle className='mr-2 text-xl' /> Continue With Google</button>
            {error && <p className='text-red-500 mt-1'>{error.message}</p>}
        </>
    );
};

export default SocialLogin;