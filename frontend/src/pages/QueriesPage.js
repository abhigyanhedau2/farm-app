import React from 'react';
import { Fragment } from 'react';
import CategoryHeader from '../components/CategoryHeader/CategoryHeader';
import QueryCards from '../components/QueryCards/QueryCards';

import queriesImg from '../assets/queries.jpg';

const QueriesPage = () => {
    return (
        <Fragment>
            <CategoryHeader category="Customer Queries" image={queriesImg} />
            <QueryCards />
        </Fragment>
    )
};

export default QueriesPage;