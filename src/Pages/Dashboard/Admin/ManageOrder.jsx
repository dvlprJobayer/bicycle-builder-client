import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosBicycle from '../../../api/axiosBicycle';
import Loading from '../../../Components/Loading/Loading';
import auth from '../../../Firebase/firebase.init';

const ManageOrder = () => {

    const location = useLocation();
    const [user] = useAuthState(auth);
    const [id, setId] = useState('');
    const { data, isLoading, error, refetch } = useQuery(['all-order', user], () => axiosBicycle('/all-order'));
    const orders = data?.data;
    if (error?.response?.status === 403 || error?.response?.status === 401) {
        signOut(auth);
        <Navigate to="/login" state={{ from: location }} replace />;
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

    const shippedOrder = id => {
        axiosBicycle.patch(`/order/${id}`, {
            status: 'shipped'
        }).then(res => {
            refetch();
            toast.success('Successfully shipped order');
        }).catch(err => {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                signOut(auth);
                <Navigate to="/login" state={{ from: location }} replace />;
            }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Picture</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td><img className='h-16 w-16 object-cover' src={order.img} alt="" /></td>
                                <td>{order.pdName}</td>
                                <td>{order.quantity}</td>
                                <td>${order.price}</td>
                                <td>{order.status}</td>
                                <td>{order.status === 'unpaid' && <label htmlFor="admin-cancel-order" onClick={() => setId(order._id)} className='btn btn-error text-white btn-xs'>Cancel</label>}</td>
                                <td>{order.status === 'pending' && <button onClick={() => shippedOrder(order._id)} className='btn btn-success text-white btn-xs'>Shipped</button>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Admin Cancel order Modal */}
            <input type="checkbox" id="admin-cancel-order" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-sm">
                    <h3 className="font-bold text-lg text-center mb-4">Are you sure? You want to cancel this order!</h3>
                    <div className="flex justify-center gap-x-4">
                        <label onClick={() => cancelOrder(id)} htmlFor="admin-cancel-order" className="btn btn-error text-white">Yes</label>
                        <label htmlFor="admin-cancel-order" className="btn btn-success text-white">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;