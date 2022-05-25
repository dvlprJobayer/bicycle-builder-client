import React, { useState } from 'react';
import Loading from '../../../Components/Loading/Loading';
import useProducts from '../../../hooks/useProducts';
import { BsFillTrashFill } from 'react-icons/bs';
import axiosBicycle from '../../../api/axiosBicycle';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../../../Firebase/firebase.init';
import { Navigate, useLocation } from 'react-router-dom';

const ManageProduct = () => {

    const location = useLocation();

    const { products, isLoading, refetch } = useProducts();

    const [id, setId] = useState('');

    if (isLoading) {
        return <Loading></Loading>
    }

    const removeProduct = id => {
        axiosBicycle.delete(`/product/${id}`).then(res => {
            toast.success('Successfully deleted');
            refetch();
        }).catch(err => {
            toast.error('Delete Operation failed');
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                signOut(auth);
                <Navigate to="/login" state={{ from: location }} replace />;
            }
        })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Min Order Quantity</th>
                            <th>Available Quantity</th>
                            <th>Per Unit Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.data.map((product, index) => <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td><img className='h-16 w-16' src={product.img} alt="" /></td>
                                <td>{product.name}</td>
                                <td>{product.min}</td>
                                <td>{product.available}</td>
                                <td>${product.price}</td>
                                <td><label for="delete-product-modal" onClick={() => setId(product._id)} className='btn btn-error text-white'><BsFillTrashFill className='text-2xl' /></label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <input type="checkbox" id="delete-product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-sm">
                    <h3 className="font-bold text-lg text-error text-center">Are you sure you want to delete the user!</h3>
                    <div className='flex mt-4 gap-x-4 justify-center'>
                        <label onClick={() => removeProduct(id)} htmlFor="delete-product-modal" className="btn btn-error text-white">Delete!</label>
                        <label htmlFor="delete-product-modal" className="btn">Cancel!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;