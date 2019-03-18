import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './Register.module.css';
import { updateObject, checkValidity} from '../../shared/utility';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionIndex';

class Register extends Component {
    state = {
        formControls: {
            username: {
                index: 1,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your username'
                },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    isUsername: true,
                    required: true
                }
            },
            email: {
                index: 2,
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
                index: 3,
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
            },
            password2: {
                index: 4,
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm your password'
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

    switchToLogin = () => {
        this.props.history.push('/login');
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const { value } = event.target;
        const updatedFormElement = updateObject(this.state.formControls[inputIdentifier], {
          value: value,
          touched: true,
          valid: checkValidity(value, this.state.formControls[inputIdentifier].validation)
      })
      const updatedForm = updateObject(this.state.formControls, {
          [inputIdentifier]: updatedFormElement
      });
      let formIsValid = true;
      for (let key in updatedForm){
          formIsValid = updatedForm[key].valid && formIsValid;
      }
      this.setState({formControls: updatedForm, formIsValid});
      };
    
      onSubmit = event => {
        event.preventDefault();
        let { password, password2} = this.state.formControls;
        console.log(password.value, password2.value)
        if (password.value !== password2.value){
          alert('passwords do not match');
        } else {
        const controls = { ...this.state.formControls };
        const data = {};
        for (let control in controls){
          data[control] = controls[control]['value'];
        }
        this.props.onRegister(data);
        }
        
      };
    render (){
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
        ))
      
    return (
        <div className={classes.Register}>
        <h2>REGISTER</h2>
        <form onSubmit={this.onSubmit}>
            {form}
            <Button>REGISTER</Button>
        </form>
        <span className={classes.Option} onClick={this.switchToLogin}>Already signed up?</span>
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
        onRegister: data => dispatch(actionCreators.onRegister(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);