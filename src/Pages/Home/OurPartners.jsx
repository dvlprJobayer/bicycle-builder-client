import React from 'react';
import logo from '../../img/images.png';
import logo2 from '../../img/images.jpg';
import logo3 from '../../img/brand.png';
import logo4 from '../../img/brand-2.png';
import logo5 from '../../img/brand-3.jpg';
import logo6 from '../../img/brand-4.jpg';

const OurPartners = () => {
    return (
        <div className='container mx-auto pt-2 mb-8'>
            <h2 className='text-center mb-8 text-5xl text-primary'>Our Partners</h2>
            <div className="flex justify-evenly">
                <img className='h-32 w-32 object-contain' src={logo} alt="" />
                <img className='h-32 w-32 object-contain' src={logo2} alt="" />
                <img className='h-32 w-32 object-contain' src={logo3} alt="" />
                <img className='h-32 w-32 object-contain' src={logo4} alt="" />
                <img className='h-32 w-32 object-contain' src={logo5} alt="" />
                <img className='h-32 w-32 object-contain' src={logo6} alt="" />
            </div>
        </div>
    );
};

export default OurPartners;