import React from 'react';
import Loading from '../../Components/Loading/Loading';
import useProducts from '../../hooks/useProducts';
import SingleParts from '../Home/SingleParts';

const Products = () => {

    const { products, isLoading } = useProducts();

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto my-6'>
            <div className="grid gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mb-8">
                {
                    products.data.map(product => <SingleParts key={product._id} part={product} />)
                }
            </div>
        </div>
    );
};

export default Products;