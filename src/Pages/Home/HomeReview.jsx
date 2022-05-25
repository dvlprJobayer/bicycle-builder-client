import React, { useEffect, useState } from 'react';
import axiosBicycle from '../../api/axiosBicycle';
import SingleReview from './SingleReview';

const HomeReview = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axiosBicycle('/review',).then(res => setReviews(res.data));
    }, []);

    return (
        <div className='container mx-auto text-center'>
            <h2 className='text-5xl uppercase text-primary my-6'>Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-6 mb-8">
                {
                    reviews.map(review => <SingleReview key={review._id} review={review} />)
                }
            </div>
        </div>
    );
};

export default HomeReview;