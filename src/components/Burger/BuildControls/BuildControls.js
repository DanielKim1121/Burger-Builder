import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls =[
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
];
const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>current Price: {props.price.toFixed(2)}</p>
        {controls.map(ctrl =>(
            <BuildControl disabled={props.disable[ctrl.type]} add={()=>props.add(ctrl.type)}remove ={()=>props.remove(ctrl.type)} key={ctrl.label} label={ctrl.label}/>
        ))}
        <button disabled={!props.purchased} onClick={props.order} className={classes.OrderButton}> Order Now </button>
    </div>

)
export default buildControls;
