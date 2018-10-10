import React from 'react';
import burger from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burger} alt="myBurger"/>
    </div>
);

export default logo;
