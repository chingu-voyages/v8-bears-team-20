import React, {Component } from 'react';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import {checkValidity, updateObject} from '../../shared/utility';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionIndex';

class Login extends Component {
    
    state = {
        formControls: {
            email: {
                index: 1,
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                index: 2,
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
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
        loading: false,
        formIsValid: false
    }
    
    switchToRegistration = () => {
        this.props.history.push('/register');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const { value } = event.target;
        let updatedFormElement = updateObject(this.state.formControls[inputIdentifier], {
            value,
            valid: checkValidity(value, this.state.formControls[inputIdentifier].validation),
            touched: true
        });
        const updatedForm = updateObject(this.state.formControls, {
            [inputIdentifier]: updatedFormElement
          });
          let formIsValid = true;
          for (let key in updatedForm){
            formIsValid = updatedForm[key].valid && formIsValid;
          }
        this.setState({formControls: updatedForm, formIsValid});
    }

    onSubmit = event => {
        event.preventDefault();
        const controls = {...this.state.formControls}
        const data = {};
        for (let control in controls){
            data[control] = controls[control]['value'];
        }
        this.props.onLogIn(data);
        this.setState({loading: true})
    }
    render () {
        let formElementsArray = [];
        for (let key in this.state.formControls){
            formElementsArray.push({
                id: key,
                config: this.state.formControls[key]
            });
        }
        formElementsArray = formElementsArray.sort((a, b) => a.config.index - b.config.index);
        let form = formElementsArray.map(formElement => (
                <Input key={formElement.id} inputType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig} 
                 value={formElement.config.value}
                 touched={formElement.config.touched}
                 invalid={!formElement.config.valid}
                 shouldValidate={formElement.config.validation}
                 onChange={event => this.inputChangedHandler(event, formElement.id)}
                 />
            )
        )
        let content = (
            <>
                <form onSubmit={this.onSubmit}>
                        {form}
                        <Button disabled={!this.state.formIsValid}>LOG IN</Button>
                </form>
                <span className={classes.Options}>
                    <span>Forgot password?</span>
                    <span onClick={this.switchToRegistration}>Not signed up yet?</span>
                </span>
            </>
        )
        if (this.state.loading) {
            content = <Spinner />
        }
        return (
            <div className={classes.Login}>
                <h2>LOGIN</h2>
                {content}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
       onLogIn: data => dispatch(actionCreators.onLogIn(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);