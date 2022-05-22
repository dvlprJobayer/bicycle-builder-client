import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>
            </div>
            <button className='btn btn-primary btn-outline'><FcGoogle className='mr-2 text-xl' /> Continue With Google</button>
        </>
    );
};

export default SocialLogin;