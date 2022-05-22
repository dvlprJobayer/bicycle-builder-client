import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <div className='text-center bg-primary text-white py-4'>
            <p><small>&copy; <strong>Bicycle Builder</strong> {year} all Rights Reserved</small></p>
        </div>
    );
};

export default Footer;