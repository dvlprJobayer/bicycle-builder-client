import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosBicycle from '../../../api/axiosBicycle';
import Loading from '../../../Components/Loading/Loading';
import auth from '../../../Firebase/firebase.init';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const { price, name, email, _id } = order;

    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (price) {
            axiosBicycle.post("/create-payment-intent", {
                price
            }).then(res => {
                if (res.data?.clientSecret) {
                    setClientSecret(res.data.clientSecret);
                }
            }).catch(err => {
                if (err?.response?.status === 403 || err?.response?.status === 401) {
                    signOut(auth);
                    <Navigate to="/login" state={{ from: location }} replace />;
                }
            })
        }
    }, [price, location]);

    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            toast.error(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // Confirm Card Payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name,
                        email
                    },
                },
            },
        );

        if (intentError) {
            toast.error(intentError.message);
        } else {
            toast.success('Payment is Completed');
            setTransactionId(paymentIntent.id);
            axiosBicycle.patch(`/order/${_id}`, {
                status: 'pending',
                transactionId: paymentIntent.id
            }).then(res => console.log(res.data)).catch(err => {
                if (err?.response?.status === 403 || err?.response?.status === 401) {
                    signOut(auth);
                    <Navigate to="/login" state={{ from: location }} replace />;
                }
            })
        }

        setLoading(false);
    }

    return (
        <>
            {loading && <Loading></Loading>}
            <form className='text-left' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-4 text-white' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {transactionId && <p className='mt-4 font-semibold'>Your Transaction Id: <span className='text-success'>{transactionId}</span></p>}
        </>
    );
};

export default CheckoutForm;