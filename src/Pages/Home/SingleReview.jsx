import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';

const SingleReview = ({ review }) => {

    const ratings = review.star;
    const star = [];
    for (let index = 0; index < ratings; index++) {
        star.push(index);
    }

    return (
        <div className="card max-w-sm bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <div className='h-32 w-32 bg-base-300 flex justify-center items-center rounded-full'>
                    {
                        review.img ?
                            <img src={review.img} alt="Shoes" className="h-32 w-32 rounded-full object-contain" /> :
                            <h3 className='text-3xl font-semibold'>USER</h3>
                    }
                </div>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{review.name}</h2>
                <p>{review.reviewText}</p>
                <p className='flex mt-1'>
                    {
                        star.map(s => <BsFillStarFill className='mr-2 text-yellow-500' />)
                    }
                </p>
            </div>
        </div>
    );
};

export default SingleReview;