import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const show = Object.keys(props.ingredients).map(
        (Thekey) => {
            return <li key={Thekey}>
            <span>{Thekey}</span> : {props.ingredients[Thekey]}
            </li>
        }
    );
    return(
        <Aux>
            <p>Your delicious order</p>
            <ul>
            {show}
            </ul>
            <p>Burger Price: {props.price.toFixed(2)}</p>
            <p>want to continue purchasing?</p>
            <Button btnType='Danger' clicked={props.buttonCancle}>Cancle</Button>
            <Button btnType='Success' clicked={props.buttonContinue}>Continue</Button>

        </Aux>
    );
}
export default orderSummary;
