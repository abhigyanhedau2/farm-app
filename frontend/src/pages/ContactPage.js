import React, { useEffect } from 'react';
import Contact from '../components/Contact/Contact';

const ContactPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `Birch Wood Ranch | Contact`;
    }, []);

    return <Contact />;
}

export default ContactPage;