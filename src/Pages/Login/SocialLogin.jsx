import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import auth from '../../Firebase/firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../../Components/Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    if (loading) {
        return <div className='min-h-screen'>
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