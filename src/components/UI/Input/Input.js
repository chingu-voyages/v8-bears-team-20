import React from 'react';
import classes from './Input.module.css';
const input = props => {
    let inputElement = null;
    let attachedClasses = [classes.InputElement];
    if (props.shouldValidate && props.invalid && props.touched){
        attachedClasses.push(classes.Invalid);
    }
    switch (props.inputType){
        case 'input': 
            inputElement = <input {...props.elementConfig} value={props.value} 
            onChange={props.onChange}
            className={attachedClasses.join(' ')}
            />;
            break;
        case 'text-area': 
            inputElement = <textarea {...props.elementConfig} />
            break;
        default: 
            inputElement = null;
    }
    return <div className={classes.Input}>{inputElement}</div>;
}

export default input;