import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosBicycle from '../../api/axiosBicycle';
import Loading from '../../Components/Loading/Loading';
import auth from '../../Firebase/firebase.init';

const MyProfile = () => {

    const location = useLocation();

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(false);

    const { data: profile, isLoading, error, refetch } = useQuery(['userProfile', user], () => axiosBicycle(`/user/${user?.email}`));

    if (error?.response?.status === 403 || error?.response?.status === 401) {
        signOut(auth);
        <Navigate to="/login" state={{ from: location }} replace />;
    }

    const imgApiKey = '32a9caee4e9423e3c7f8f8cded35c60f';
    const url = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const name = data.name;
        const address = data.address;
        const phone = data.phone;
        const formData = new FormData();
        formData.append('image', data.userImg[0]);
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            const img = result.data.url;
            if (result.success) {
                axiosBicycle.put(`/user?email=${user.email}`, {
                    name,
                    address,
                    phone,
                    img
                }).then(res => {
                    setLoading(false);
                    refetch();
                    toast.success('successfully profile updated');
                }).catch(err => {
                    setLoading(false);
                    toast.error('something error on profile updated');
                })
            }
        }).catch(err => {
            setLoading(false);
            toast.error('something error on profile updated');
        })
    }

    if (isLoading || loading) {
        return <Loading></Loading>
    }

    return (
        <div className='ml-2'>
            <h1 className='text-4xl text-center text-primary mb-6 font-semibold'>My Profile</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="card max-w-md bg-base-100 shadow-xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <h2 className="card-title">Name:</h2>
                            <input placeholder='Your Name' type="text" {...register("name")} defaultValue={profile?.data?.name} className="input input-bordered text-lg font-semibold w-full max-w-md" disabled={profile?.data?.name} />
                            <h2 className="card-title">Email:</h2>
                            <input type="email" value={user?.email} className="input input-bordered text-lg font-semibold w-full max-w-md" disabled />
                            <h2 className="card-title">Address:</h2>
                            <input defaultValue={profile?.data?.address} type="text" {...register("address")} placeholder="Your Address" className="input input-bordered text-lg font-semibold w-full max-w-md" disabled={profile?.data?.address} />
                            <h2 className="card-title">Phone Number:</h2>
                            <input defaultValue={profile?.data?.phone} type="text" {...register("phone")} placeholder="Your Phone Number" className="input input-bordered text-lg font-semibold w-full max-w-md" disabled={profile?.data?.phone} />
                            <h2 className="card-title">Upload Image:</h2>
                            <input type="file" {...register("userImg")} className="input input-bordered text-lg font-semibold w-full max-w-md" disabled={profile?.data?.img} />
                            <input type="submit" className='btn btn-primary w-full mt-3' value="Update Profile" disabled={profile?.data?.phone && profile?.data?.address && profile?.data?.img && profile?.data?.name} />
                        </div>
                    </form>
                </div>
                <div className='h-64 w-64 bg-base-300 rounded-full flex items-center justify-center'>
                    {
                        profile?.data?.address ?
                            <img src={profile?.data?.img} className="rounded-full h-64 w-64 object-contain" alt="USER" /> :
                            <h3 className='text-4xl font-bold'>USER</h3>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyProfile;