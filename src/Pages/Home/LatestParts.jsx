import React, { useEffect, useState } from 'react';
import axiosBicycle from '../../api/axiosBicycle';
import SingleParts from './SingleParts';

const LatestParts = () => {

    const [parts, setParts] = useState([]);

    useEffect(() => {
        axiosBicycle('/all-parts').then(res => setParts(res.data));
    }, []);

    return (
        <div className='container mx-auto'>
            <h2 className='text-5xl text-center text-primary mb-6'>Our Latest Collection</h2>
            <div className="grid gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mb-8">
                {
                    parts.map(part => <SingleParts key={part._id} part={part} />)
                }
            </div>
        </div>
    );
};

export default LatestParts;