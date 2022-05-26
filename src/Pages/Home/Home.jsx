import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import HomeReview from './HomeReview';
import LatestParts from './LatestParts';

const Home = () => {
    return (
        <>
            <Banner />
            <LatestParts />
            <HomeReview />
            <BusinessSummary />
        </>
    );
};

export default Home;