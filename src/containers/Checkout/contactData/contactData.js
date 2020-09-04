import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Sppiner from '../../../components/UI/Sppiner/Sppiner';
import axios from '../../../axios-orders'
import classes from './contactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        street: '',
        postalcode:'',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        this.setState({ loading: true });
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                street: this.state.street,
                postalcode: this.state.postalcode,
                country: 'Egypt',
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        }
        //console.log(this.state.address.street);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false})
            });
    }

    onChangeHandler (e){
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.street]: e.target.value,
            [e.target.postalcode]: e.target.value
        });
    }

    render() {
        let form = (<form>
            <input
                className={classes.Input}
                type='text'
                name='name'
                placeholder='Name'
                onChange={e => this.onChangeHandler(e)}
            />
            
            <input
                className={classes.Input}
                type='text'
                name='email'
                placeholder='Mail'
                onChange={e => this.onChangeHandler(e)}
            />
                    
            <input
                className={classes.Input}
                type='text'
                name='street'
                placeholder='Street' 
                onChange={e => this.onChangeHandler(e)}
            />
                    
            <input
                className={classes.Input}
                type='text'
                name='postalcode'
                placeholder='Postalcode' 
                onChange={e => this.onChangeHandler(e)}
            />
                    
            <Button
                btnType="Success"
                clicked={this.orderHandler}>ORDER
            </Button>

        </form>
        );
        
        if (this.state.loading) {
            form = <Sppiner/>
        }

        return (
            <div className={classes.contactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;