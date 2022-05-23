import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';

const MyProfile = () => {

    const [user] = useAuthState(auth);

    return (
        <div className='ml-2'>
            <h1 className='text-4xl text-center text-primary mb-6 font-semibold'>My Profile</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="card max-w-md bg-base-100 shadow-xl">
                    <form action="">
                        <div className="card-body">
                            <h2 className="card-title">Name:</h2>
                            <input type="text" value={user?.displayName} className="input input-bordered text-lg font-semibold w-full max-w-md" disabled />
                            <h2 className="card-title">Email:</h2>
                            <input type="email" value={user?.email} className="input input-bordered text-lg font-semibold w-full max-w-md" disabled />
                            <h2 className="card-title">Address:</h2>
                            <input type="text" placeholder="Your Address" className="input input-bordered text-lg font-semibold w-full max-w-md" />
                            <h2 className="card-title">Phone Number:</h2>
                            <input type="text" placeholder="Your Phone Number" className="input input-bordered text-lg font-semibold w-full max-w-md" />
                            <h2 className="card-title">Upload Image:</h2>
                            <input type="file" className="input input-bordered text-lg font-semibold w-full max-w-md" />
                            <input type="submit" className='btn btn-primary w-full mt-3' value="Update Profile" />
                        </div>
                    </form>
                </div>
                <div className='h-64 w-64 bg-base-300 rounded-full flex items-center justify-center'>
                    {/* <img src="" alt="USER" /> */}
                    <h3 className='text-4xl font-bold'>USER</h3>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;