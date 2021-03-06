import React from 'react';
import { Link } from 'react-router-dom';

const SingleParts = ({ part }) => {
    const { name, img, description, available, min, price, _id } = part;
    return (
        <div className="card max-w-sm bg-base-100 shadow-xl">
            <figure className="px-4 pt-4">
                <img src={img} alt="Shoes" className="rounded-xl w-72 h-72 object-contain" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">{name}</h2>
                <p title={description}>{description.slice(0, 50)}...</p>
                <p className='font-semibold text-primary'>Minimum Order Quantity: {min}</p>
                <p className='font-semibold text-primary'>Available Quantity: {available}</p>
                <p className='font-semibold text-primary'>Per unit price: ${price}</p>
                <div className="card-actions">
                    <Link to={`/purchase/${_id}`} className="btn btn-primary text-white">Order Now</Link>
                </div>
            </div>
        </div>
    );
};

export default SingleParts;