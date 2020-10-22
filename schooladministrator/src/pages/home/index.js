import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

export const Home = () => {
    return (
        <Fragment>
            <Helmet title='Home' />
           <h1>Bienvenido</h1> 
        </Fragment>
    )
}

export default Home;