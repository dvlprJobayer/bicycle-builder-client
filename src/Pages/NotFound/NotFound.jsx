import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightSquare } from 'react-icons/bs';

const NotFound = () => {
    return (
        <div className='container mx-auto text-center'>
            <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2">
                    <img className='img-fluid' src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg" alt="" />
                </div>
                <div className="w-full lg:w-1/2">
                    <h2 className='text-4xl font-semibold mb-4'>Oops, This Page Could Not Be Found!</h2>
                    <Link to="/" className='mt-4 btn btn-primary text-white btn-lg mb-8 lg:mb-0'>Go to Homepage<BsArrowRightSquare className='ml-3' /></Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;