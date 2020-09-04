import React, { Component } from 'react';

import Auxl from '../../../hoc/Auxl/Auxl'
//  import { object } from 'prop-types';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map( igKey => {
            return (<li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>
                            {igKey}:
                        </span>
                        {this.props.ingredients[igKey]}
                    </li>
        )});


        return (
        <Auxl>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue To Checkout?</p>
            <Button
                clicked={this.props.purchaseCancelled}
                btnType="Danger">CANCEL</Button>
            <Button
                clicked={this.props.purchaseContinued}
                btnType="Success">CONTINUE</Button>
        </Auxl>
    );
    }
} 

export default OrderSummary;