import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosBicycle from '../../../api/axiosBicycle';
import Loading from '../../../Components/Loading/Loading';
import auth from '../../../Firebase/firebase.init';

const MyOrder = () => {

    const location = useLocation();
    const [user] = useAuthState(auth);
    const [id, setId] = useState('');
    const { data, error, isLoading, refetch } = useQuery(['orders', user], () => axiosBicycle(`/order?email=${user.email}`));
    const orders = data?.data;
    if (error?.response?.status === 403 || error?.response?.status === 401) {
        signOut(auth);
        <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    const cancelOrder = id => {
        axiosBicycle.delete(`/order/${id}`).then(res => {
            refetch();
            toast.success('Successfully Cancel the order');
        }).catch(err => {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                signOut(auth);
                <Navigate to="/login" state={{ from: location }} replace />;
            }
            toast.error('cancel operation failed');
        })
    }

    return (
        <div className='mx-4'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Picture</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <th><img className='h-16 w-16 object-cover' src={order.img} alt="" /></th>
                                <td>{order.pdName}</td>
                                <td>{order.quantity}</td>
                                <td>${order.price}</td>
                                <td>{order.status}</td>
                                <td>
                                    {
                                        order.status === 'unpaid' ? <Link to={`/dashboard/payment/${order._id}`} className='btn btn-success text-white'>Pay</Link> : <p className='text-success font-semibold text-lg'>Paid</p>
                                    }
                                </td>
                                {
                                    order.status === 'unpaid' && <td>
                                        <label htmlFor="cancel-order-modal" onClick={() => setId(order._id)} className='btn btn-error text-white'>Cancel</label>
                                    </td>
                                }
                                {
                                    order.status !== 'unpaid' && <td className='text-success font-semibold text-lg'>
                                        {
                                            order.transactionId
                                        }
                                    </td>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Cancel Order Modal */}
            <input type="checkbox" id="cancel-order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-sm">
                    <h3 className="font-bold text-lg text-center mb-4">Are you sure? You want to cancel this order!</h3>
                    <div className="flex justify-center gap-x-4">
                        <label onClick={() => cancelOrder(id)} htmlFor="cancel-order-modal" className="btn btn-error text-white">Yes</label>
                        <label htmlFor="cancel-order-modal" className="btn btn-success text-white">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;