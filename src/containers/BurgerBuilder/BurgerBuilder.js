import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTPRICE = {
    salad:.4,
    cheese:.4,
    meat:1,
    bacon:.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients:null,
         burgerPrice:4,
         purchasable: false,
         purchase: false,
         loading:false,
         error: false
    }
    componentDidMount(){
        axios.get('/ingredients.json').then(

            response=>{
                console.log(response);
                this.setState({ingredients:response.data});
            }
        ).catch(error => {
            this.setState({error:true});
        });
    }
    purchaseHandler = () =>{
        this.setState({purchase:true});
    }

    purchaseRemoveHandler = () =>{
        this.setState({purchase:false});
    }
    purchaseContinueHandler = () => {
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.burgerPirce,
            customer: {
                name: 'Dan',
                address:{
                    street:'afdsfa',
                    zip:'fadsfa',
                    country:'sdafad'
                },
                email:'adsfadsf',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(
            response=> {console.log(response);
                this.setState({loading:false, purchase:false});
            }
        ).catch(error =>{console.log(error);
        this.setState({loading:false, purchase:false});});
    }
    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, al) => {
            return sum + al;
        }, 0);
        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) =>{
        const oldFilling = this.state.ingredients[type];
        const updatedFilling = oldFilling + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = updatedFilling;
        const oldPrice = this.state.burgerPrice;
        const newPrice = oldPrice + INGREDIENTPRICE[type];
        this.setState({burgerPrice:newPrice, ingredients:newIngredients});
        this.updatePurchasable(newIngredients);
    };

    removeIngredientHandler = (type) =>{
        const oldFilling = this.state.ingredients[type];
        if(oldFilling > 0){
            const updatedFilling = oldFilling - 1;
            const newIngredients = {...this.state.ingredients};
            newIngredients[type] = updatedFilling;
            const oldPrice = this.state.burgerPrice;
            const newPrice = oldPrice - INGREDIENTPRICE[type];
            this.setState({burgerPrice:newPrice, ingredients:newIngredients});
            this.updatePurchasable(newIngredients);
        }
        else{
            return;
        }
    }
    render(){
        let orderSummary = null;
        let disabledKey = {...this.state.ingredients};
        for(let key in disabledKey){
            disabledKey[key] = disabledKey[key] <= 0;
        }
        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (<Aux><Burger ingredients={this.state.ingredients}/>
            <BuildControls order={this.purchaseHandler} purchased = {this.state.purchasable} price={this.state.burgerPrice} add={this.addIngredientHandler} remove={this.removeIngredientHandler} disable={disabledKey}/>
            </Aux>);
            orderSummary =<OrderSummary price={this.state.burgerPrice} buttonCancle ={this.purchaseRemoveHandler} buttonContinue={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
            <Modal undo={this.purchaseRemoveHandler} show={this.state.purchase}>
                {orderSummary}
            </Modal>
            {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);
