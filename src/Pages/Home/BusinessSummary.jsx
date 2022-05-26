import React from 'react';
import { IoIosPeople } from 'react-icons/io';
import { BiDollarCircle } from 'react-icons/bi';
import { BsTools } from 'react-icons/bs';

const BusinessSummary = () => {
    return (
        <div className='container mx-auto'>
            <h2 className='text-center text-primary text-5xl mt-4'>Business Summary</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 my-6'>
                <div className='flex flex-col items-center'>
                    <p><IoIosPeople className='text-8xl text-primary' /></p>
                    <h3 className='text-5xl font-semibold'>100<span>+</span></h3>
                    <p className='text-lg mt-2 font-semibold text-primary'>Customer</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p><BiDollarCircle className='text-7xl text-primary' /></p>
                    <h3 className='text-5xl font-semibold mt-4'>120M<span>+</span></h3>
                    <p className='text-lg mt-2 font-semibold text-primary'>Annual revenue</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p><BsTools className='text-6xl text-primary' /></p>
                    <h3 className='text-5xl font-semibold mt-6'>50<span>+</span></h3>
                    <p className='text-lg mt-2 font-semibold text-primary'>Tools</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;