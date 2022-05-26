import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='lg:ml-40 ml-4 mr-4 my-12'>
            <h2 className='text-5xl text-primary mb-6'>My Portfolio</h2>
            <h3 className='text-2xl font-bold'>Name:</h3>
            <h3 className='text-primary font-semibold mt-1 text-xl'>Jobayer Ahammed Patwary</h3>
            <h3 className='text-2xl mt-3 font-bold'>Email:</h3>
            <h3 className='text-primary text-xl font-semibold mt-1'>nesarahammed019@gmail.com</h3>
            <h3 className='text-2xl mt-3 font-bold'>Technologies:</h3>
            <ul className='mt-2 ml-8'>
                <li className='text-lg list-disc'>HTML5</li>
                <li className='text-lg list-disc'>CSS3</li>
                <li className='text-lg list-disc'>CSS3</li>
                <li className='text-lg list-disc'>JavaScript</li>
                <li className='text-lg list-disc'>Bootstrap</li>
                <li className='text-lg list-disc'>Tailwind CSS</li>
                <li className='text-lg list-disc'>React</li>
                <li className='text-lg list-disc'>React Bootstrap</li>
                <li className='text-lg list-disc'>Express js</li>
                <li className='text-lg list-disc'>Mongodb</li>
            </ul>
            <h3 className='text-2xl mt-4 font-bold'>Projects:</h3>
            <p className='text-xl mt-2'>Project Name: <a className='font-semibold text-primary underline' rel='noreferrer' target="_blank" href="https://fitness-house-2e9fe.web.app/">Fitness House</a></p>
            <p className='text-xl mt-2'>Project Description:</p>
            <p className='text-lg'>Fitness House is a warehouse management website user can add product and main product. user also delivered a product and user can update product quantity. user can also delete product.</p>
            <p className='text-xl mt-4'>Project Name: <a className='font-semibold text-primary underline' rel='noreferrer' target="_blank" href="https://jacob-billy.web.app/">Jacob Billy</a></p>
            <p className='text-xl mt-2'>Project Description:</p>
            <p className='text-lg'>Jacob Billy is a individual service provider Website. Jacob billy is a professional photographer. This website uses private route. also this website implemented authentication system.</p>
            <p className='text-xl mt-4'>Project Name: <a className='font-semibold text-primary underline' rel='noreferrer' target="_blank" href="https://bicycle-builder.web.app/">Bicycle Builder</a></p>
            <p className='text-xl mt-2'>Project Description:</p>
            <p className="text-lg">Bicycle Builder is a manufacturer website. This website has firebase authentication system. Private route, nested route. This website also has payment integration system. user can order a quantity of product. if user not paid for the product user can cancel this product. user can payment for the product. if user pay any order product user can not cancel paid product. user can update profile from my profile page. This website also has admin route only admin can access this particular route. Admin can add product. Admin can cancel any user order which is not paid yet. Admin can delete any product.</p>
        </div>
    );
};

export default MyPortfolio;