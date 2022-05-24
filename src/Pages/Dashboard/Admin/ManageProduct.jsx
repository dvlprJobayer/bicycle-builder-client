import React from 'react';
import Loading from '../../../Components/Loading/Loading';
import useProducts from '../../../hooks/useProducts';
import { BsFillTrashFill } from 'react-icons/bs';

const ManageProduct = () => {

    const { products, isLoading } = useProducts();

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
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
                            <td><button className='btn btn-error text-white'><BsFillTrashFill className='text-2xl' /></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;