import React from 'react';


import aboutImg1 from '../../assets/about-image-1.jpg'
import aboutImg2 from '../../assets/about-image-2.jpg'
import aboutImg3 from '../../assets/about-image-3.jpg'
import classes from './About.module.css';

const About = () => {
    return (
        <div className={classes.aboutWrapper}>
            <div className={classes.aboutText}>
                <h1>About Us</h1>
                <p>To develop a sustainable ecosystem, we support small farmers, local produce, local communities and the nature. Offering a wide range of conventional, organic, exotic fresh Fruits & Vegetables through direct farm sourcing and distribution to your doorstep.Daily delivery of quality fresh fruits & vegetables at best prices to Small Enterprises. We go extra mile to offer you the best selection of local & global produce. More happy customer. More income.</p>
                <p>Leave your sourcing worries to us & reap the benefits of our Dynamic Source Optimisation module. We identify best source offering lowest prices in sync with your daily demand. You save money by optimising purchase prices, inventory & overhead cost. We also help you with market price feeds & outlook so as to help you plan your purchases efficiently.</p>
                <p>We offer right price & price hedging mechanism to suit your unique quality norms & delivery schedule. We identify best source to suit your bulk requirement across our registered farms on pan India level. We ensure total process compliance on quality, packing & handling so as to deliver as per the contract.</p>
            </div>
            <div className={classes.aboutImages}>
                <img className={classes.aboutImg1} src={aboutImg1} alt="about-1" />
                <img className={classes.aboutImg2} src={aboutImg2} alt="about-2" />
                <img className={classes.aboutImg3} src={aboutImg3} alt="about-3" />
            </div>
        </div>
    )
};

export default About;