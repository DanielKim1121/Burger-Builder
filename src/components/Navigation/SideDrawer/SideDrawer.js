import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop.js';
import Aux from '../../../hoc/Aux';
const sideDrawer = (props) => {
    let sideClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        sideClass[1] = classes.Open;
    }
    return(
        <Aux>
        <BackDrop show={props.open} undo = {props.closed}/>
        <div className={sideClass.join(' ')}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>

    );
}

export default sideDrawer;
