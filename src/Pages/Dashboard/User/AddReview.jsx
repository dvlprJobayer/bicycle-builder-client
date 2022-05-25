import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../../Firebase/firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import axiosBicycle from '../../../api/axiosBicycle';
import { signOut } from 'firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loading/Loading';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    const [reviewText, setReviewText] = useState('');
    const [reviewUser, setReviewUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosBicycle(`/user/${user.email}`).then(res => setReviewUser(res.data)).catch(err => {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                signOut(auth);
                <Navigate to="/login" state={{ from: location }} replace />;
            }
        })
    }, [user, location]);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setLoading(true);
        const star = parseInt(data.star)
        axiosBicycle.post('/review', {
            name: reviewUser.name,
            email: reviewUser.email,
            img: reviewUser.img,
            reviewText,
            star
        }).then(res => {
            setLoading(false);
            toast.success('Successfully Add Review');
            reset();
        }).catch(err => {
            setLoading(false);
            toast.error('Add Review Operation failed');
        })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-4xl text-center text-primary'>Add A Review</h1>
            <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <label htmlFor="">Name</label>
                        <input {...register("name")} type="text" defaultValue={reviewUser.name} className="input input-bordered w-full mb-2" disabled />
                        <label htmlFor="">Review Text</label>
                        <textarea onChange={e => setReviewText(e.target.value)} className='textarea textarea-bordered mb-2' name="" id="" cols="30" rows="4"></textarea>
                        <label htmlFor="">Review Star</label>
                        <input {...register("star")} type="text" className="input input-bordered w-full mb-3" />
                        <input type="submit" className="btn btn-primary w-full" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;