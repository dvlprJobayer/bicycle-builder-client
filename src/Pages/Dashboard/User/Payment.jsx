import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import axiosBicycle from '../../../api/axiosBicycle';
import auth from '../../../Firebase/firebase.init';
import CheckoutForm from './CheckOutForm';


const stripePromise = loadStripe('pk_test_51L3XHTHcpBD3YA3IsKsZ5E9p3IrXg9T5WNxsmFvUG1Hdi7YLAxVnnH1Y1g4QPOkjWNNEZNvSK9cfZXikbKc2s7qv00lGGPoKW1');

const Payment = () => {

    const location = useLocation();
    const { id } = useParams();
    const [order, setOrder] = useState({});
    useEffect(() => {
        axiosBicycle(`/order/${id}`).then(res => setOrder(res.data)).catch(err => {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                signOut(auth);
                <Navigate to="/login" state={{ from: location }} replace />;
            }
        })
    }, [id, location]);

    return (
        <div className='text-center'>
            <h2 className='text-3xl text-primary font-semibold'>Your Order Info</h2>
            <p className='text-lg font-semibold mt-2'>Product Name: <span className='text-primary'>{order.pdName}</span></p>
            <p className='text-lg font-semibold mt-2'>Product Quantity: <span className='text-primary'>{order.quantity}</span></p>
            <p className='text-lg font-semibold mt-2'>Please Pay <span className='text-primary'>${order.price}</span> for order confirmation</p>

            <div className="card max-w-md mx-auto mt-8 bg-base-100 shadow-xl">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;