import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero lg:min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://images.unsplash.com/photo-1562615202-0b3035d14b6f" className="rounded-lg shadow-2xl lg:w-1/2" alt='' />
                <div className='max-w-lg mr-4 text-center lg:text-left'>
                    <h1 className="text-5xl font-bold">Bicycle Builder</h1>
                    <p className="py-6">We Provide Best Quality Bicycle Parts. Our product World's best product. Get the newest and most in-demand consumer bicycle parts.</p>
                    <Link to="/products" className="btn btn-primary text-white">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;