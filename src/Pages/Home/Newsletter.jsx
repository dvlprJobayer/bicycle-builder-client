import React from 'react';


const Newsletter = () => {
    return (
        <div className='container mx-auto'>
            <h2 className='text-primary text-5xl text-center mt-6'>Join Our Newsletter Now</h2>
            <p className='text-center text-lg mt-4'>Get all the latest information</p>
            <div className='flex items-center justify-center mt-4 mb-10'>
                <input type="text" placeholder="Email" className="input input-bordered input-primary rounded-none w-full max-w-sm" />
                <input type="submit" className='btn btn-primary rounded-none' value="Subscribe" />
            </div>
        </div>
    );
};

export default Newsletter;