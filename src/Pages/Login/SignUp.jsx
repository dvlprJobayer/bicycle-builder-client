import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Components/Loading/Loading';
import auth from '../../Firebase/firebase.init';
import SocialLogin from './SocialLogin';

const SignUp = () => {

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    }

    if (uError) {
        toast.error('Name update failed');
    }

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    if (loading || updating) {
        return <div className='min-h-screen'>
            <Loading></Loading>
        </div>
    }

    return (
        <div className='lg:min-h-screen flex justify-center items-center'>
            <div className="card static max-w-md sm:w-[450px] bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-2xl font-semibold uppercase text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="label">
                            <span className="label-text font-semibold text-lg">Name:</span>
                        </label>
                        <input type="text" {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })} className="input input-bordered w-full" />
                        {errors.name?.type === 'required' && <p className='text-red-500 mt-1'>{errors.name.message}</p>}

                        <label className="label">
                            <span className="label-text font-semibold text-lg">Email:</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid Email'
                            }
                        })} className="input input-bordered w-full" />
                        {errors.email?.type === 'required' && <p className='text-red-500 mt-1'>{errors.email.message}</p>}
                        {errors.email?.type === 'pattern' && <p className='text-red-500 mt-1'>{errors.email.message}</p>}

                        <label className="label">
                            <span className="label-text font-semibold text-lg">Password:</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: {
                                value: true,
                                message: 'Password is Required'
                            },
                            minLength: {
                                value: 6,
                                message: 'Invalid Password'
                            }
                        })} className="input input-bordered w-full" />
                        {errors.password?.type === 'required' && <p className='text-red-500 mt-1'>{errors.password.message}</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 mt-1'>{errors.password.message}</p>}

                        <input className='btn btn-primary w-full text-white mt-4' type="submit" value="SignUp" />
                    </form>
                    {error && <p className='text-red-500 mt-1'>{error.message}</p>}
                    <p className='text-center mt-1'>Already have an account? <Link to="/login" className='text-primary cursor-pointer font-bold'>Login</Link></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default SignUp;