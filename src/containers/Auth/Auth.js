import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Sppiner from '../../components/UI/Sppiner/Sppiner';
import classes from './Auth.css';

import * as action from '../../store/actions/auth';

import { checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }

    render() {
        const formElementArray = [];

        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.id}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
        let errorMessage = null;
        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this, this.props.authRedirectPath} />
        }
        
        if (this.props.loading) {
            form = <Sppiner />;
        }

        if (this.props.error) {
            if (this.props.error.message === 'INVALID_PASSWORD') {
                errorMessage = (
                    <h5 className={classes.isa_warning}>The password is invalid or the you do not have a password.</h5>
                );
            }
            
            if (this.props.error.message === 'EMAIL_NOT_FOUND') {
                errorMessage = (
                    <h5 className={classes.isa_warning}> There is no user corresponding to this email.Your account may have been deleted. </h5>
                );
            }

            if (this.props.error.message === 'EMAIL_EXISTS') {
                errorMessage = (
                    <h5 className={classes.isa_warning}>The email address is already taken.</h5>
                );
            }
        };

        return (
          <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
              {" "}
              SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}{" "}
            </Button>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);