import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import axiosBicycle from '../../api/axiosBicycle';
import Loading from '../../Components/Loading/Loading';
import auth from '../../Firebase/firebase.init';
import OrderModal from './OrderModal';

const Purchase = () => {

    const location = useLocation();
    const [user] = useAuthState(auth);

    const { id } = useParams();
    const { data: product, isLoading, refetch, error } = useQuery(['singleProduct', user], () => axiosBicycle(`/product/${id}`));

    if (error?.response?.status === 403 || error?.response?.status === 401) {
        signOut(auth);
        <Navigate to="/login" state={{ from: location }} replace />;
    }

    const [order, setOrder] = useState(null);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={product?.data?.img} className="max-w-md rounded-lg shadow-2xl" alt='' />
                    <div className="ml-12">
                        <h1 className="text-5xl font-bold">{product?.data?.name}</h1>
                        <p className="py-4">{product?.data?.description}</p>
                        <p className='pb-3 font-semibold text-lg'>Product Id: <span className='text-primary'>{product?.data?._id}</span></p>
                        <p className='pb-3 font-semibold text-lg'>Min Quantity: <span className='text-primary'>{product?.data?.min}</span></p>
                        <p className='pb-3 font-semibold text-lg'>Available Quantity: <span className='text-primary'>{product?.data?.available}</span></p>
                        <p className='pb-3 font-semibold text-lg'>Per Unit Price: <span className='text-primary'>${product?.data?.price}</span></p>
                        <label onClick={() => setOrder(product?.data)} htmlFor="order-modal" className="btn btn-primary text-white">Purchase</label>
                    </div>
                </div>
            </div>

            {/* Order Modal */}
            {
                order && <OrderModal refetch={refetch} setOrder={setOrder} order={order} />
            }
        </div>
    );
};

export default Purchase;