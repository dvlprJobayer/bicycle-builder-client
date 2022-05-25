import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosBicycle from '../../api/axiosBicycle';
import Loading from '../../Components/Loading/Loading';
import auth from '../../Firebase/firebase.init';

const OrderModal = ({ order, setOrder, refetch }) => {

    const [user, loading] = useAuthState(auth);

    const [totalPrice, setTotalPrice] = useState(order.min * order.price);

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            name: user.displayName,
            email: user.email,
            quantity: order.min,
            pdName: order.name
        }
    });
    const onSubmit = data => {
        axiosBicycle.post('/order', {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            pdName: data.pdName,
            quantity: data.quantity,
            price: totalPrice,
            pdId: order._id,
            status: 'unpaid'
        }).then(res => {
            toast.success('Successfully order complete');
            refetch();
            setOrder(null);
        }).catch(err => {
            toast.error('Order failed');
        })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='mx-auto max-w-sm' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="" className='block'>Name</label>
                        <input {...register("name")} type="text" className="input input-bordered w-full mb-2" />
                        <label htmlFor="" className='block'>Email</label>
                        <input {...register("email")} type="text" className="input input-bordered w-full mb-2" disabled />
                        <label htmlFor="" className='block'>Address</label>
                        <input {...register("address", {
                            required: {
                                value: true,
                                message: "Address is Required"
                            }
                        })} type="text" className="input input-bordered w-full mb-2" />
                        {errors.address?.type === 'required' && <p className='text-error'>{errors.address.message}</p>}

                        <label htmlFor="" className='block'>Phone</label>
                        <input {...register("phone", {
                            required: {
                                value: true,
                                message: "Phone is Required"
                            }
                        })} type="text" className="input input-bordered w-full mb-2" />
                        {errors.phone?.type === 'required' && <p className='text-error'>{errors.phone.message}</p>}

                        <label htmlFor="" className='block'>Product Name</label>
                        <input {...register("pdName")} type="text" className="input input-bordered w-full mb-2" disabled />

                        <label htmlFor="" className='block'>Quantity</label>
                        <input {...register("quantity", {
                            required: {
                                value: true,
                                message: "Quantity is Required"
                            },
                            min: {
                                value: order.min,
                                message: 'You have to Order minimum quantity'
                            },
                            max: {
                                value: order.available,
                                message: 'Don\'t have enough product'
                            }
                        })} onChange={e => setTotalPrice(e.target.value * order.price)} type="number" className="input input-bordered w-full mb-2" />
                        {errors.quantity?.type === 'required' && <p className='text-error'>{errors.quantity.message}</p>}
                        {errors.quantity?.type === 'min' && <p className='text-error'>{errors.quantity.message}</p>}
                        {errors.quantity?.type === 'max' && <p className='text-error'>{errors.quantity.message}</p>}

                        <label htmlFor="" className='block'>Total Price</label>
                        <input value={'$' + totalPrice} type="text" className="input input-bordered w-full mb-4" readOnly />

                        <input className='w-full btn btn-primary' type="submit" value="Purchase" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default OrderModal;