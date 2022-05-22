import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className='lg:min-h-screen flex justify-center items-center'>
            <div className="card static max-w-md md:w-[450px] bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-2xl font-semibold uppercase text-center">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                        <p className='text-primary font-bold cursor-pointer'>Forgot Password?</p>
                        {errors.password?.type === 'required' && <p className='text-red-500 mt-1'>{errors.password.message}</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 mt-1'>{errors.password.message}</p>}

                        <input className='btn btn-primary w-full text-white mt-4' type="submit" value="Login" />
                    </form>
                    <p className='text-center mt-1'>Don't have an account? <Link to="/signup" className='text-primary cursor-pointer font-bold'>Create New Account</Link></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;