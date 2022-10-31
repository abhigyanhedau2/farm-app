import React from 'react';

import FeatureCard from './FeatureCard';

import freshIcon from '../../assets/fresh.png';
import healthyIcon from '../../assets/healthy-living.png';
import nontoxicIcon from '../../assets/non-toxic.png';
import deliveryIcon from '../../assets/delivery-truck.png';
import classes from './Features.module.css';

const Features = () => {
    return (
        <div className={classes.features}>
            <h1 className={classes.heading__secondary}>Why shop from us?</h1>
            <div className={classes.featureCardsWrapper}>
                <FeatureCard image={freshIcon} description="We make sure that the fruits and vegetables you order are delivered to your doorstep garden-fresh and crisp. From harvesting the goods from the farm to delivering it to you, we keep the process fast moving and accelerated." />
                <FeatureCard image={healthyIcon} description="Our farm-produced goods are rich in nutrients and vitamins which are not only good for health but also available at a reasonal price, so that our customers are as fit as fiddle." />
                <FeatureCard image={nontoxicIcon} description="All the products are garden-fresh, natural, unpreserved and without any adulteration. We have high-quality tests to make sure healthy products are delivered to you." />
                <FeatureCard image={deliveryIcon} description="Just order from the site and we will have the products delivered at your doorstep within a day. We've partnered with many farms accross the town ensuring no delay in delivery of orders." />
            </div>
        </div>
    )
};

export default Features;