import React from 'react';
import classes from './BackDrop.css'
const backDrop =(props)=>{
    return props.show? <div className={classes.BackDrop} onClick={props.undo} ></div>:null;
}
export default backDrop;
