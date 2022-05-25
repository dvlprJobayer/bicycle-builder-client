import React from 'react';
import Banner from './Banner';
import HomeReview from './HomeReview';
import LatestParts from './LatestParts';

const Home = () => {
    return (
        <>
            <Banner />
            <LatestParts />
            <HomeReview />
        </>
    );
};

export default Home;