import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosBicycle from '../../api/axiosBicycle';
import SingleParts from './SingleParts';
import { BsArrowRightSquare } from 'react-icons/bs';

const LatestParts = () => {

    const [parts, setParts] = useState([]);

    useEffect(() => {
        axiosBicycle('/all-parts').then(res => setParts(res.data));
    }, []);

    return (
        <div className='container mx-auto text-center mb-6'>
            <h2 className='text-4xl font-bold uppercase text-primary mb-6'>Our Latest Collection</h2>
            <div className="grid gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mb-8">
                {
                    parts.map(part => <SingleParts key={part._id} part={part} />)
                }
            </div>
            <Link to="/products" className="btn btn-primary text-white">See All Products <BsArrowRightSquare className='ml-2 text-lg' /></Link>
        </div>
    );
};

export default LatestParts;