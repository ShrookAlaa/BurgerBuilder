import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxl from '../../hoc/Auxl/Auxl'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Sppiner from '../../components/UI/Sppiner/Sppiner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state ={
        purchasable: false,
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredient()
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map( (igKey) => {
                return ingredients[igKey];
            } )
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
      if (this.props.isAuthenticated) {
        this.setState({ purchasing: true });
      } else {
        this.props.onSetAuthRedirectPath("/checkout");
        this.props.history.push("/auth");
      }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Sppiner />;

        if (this.props.ings) {
            burger = (
              <Auxl>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  price={this.props.price}
                  isAuth={this.props.isAuthenticated}
                  purchasable={this.updatePurchaseState(this.props.ings)}
                  ordered={this.purchaseHandler}
                />
              </Auxl>
            );

            orderSummary = (
              <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
              />
            );
        }
        
        return (
          <Auxl>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.purchaseCancelHandler}
            >
              {orderSummary}
            </Modal>
            {burger}
          </Auxl>
        );
    };
}

//fetch ingredients and price from the global store
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    };
};

const mapDispatchToProps = dispach => {
    return {
        onIngredientAdded: (ingName) => dispach(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispach(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispach(actions.initIngredient()),
        onInitPurchase: () => dispach(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispach(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));