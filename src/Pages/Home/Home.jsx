import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import HomeReview from './HomeReview';
import LatestParts from './LatestParts';
import Newsletter from './Newsletter';
import OurPartners from './OurPartners';

const Home = () => {
    return (
        <>
            <Banner />
            <LatestParts />
            <HomeReview />
            <BusinessSummary />
            <OurPartners />
            <Newsletter />
        </>
    );
};

export default Home;