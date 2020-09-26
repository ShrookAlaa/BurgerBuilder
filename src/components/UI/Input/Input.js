import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let ValidationError = null;
    const inputClass = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClass.push(classes.Invalid);
    }
    if (props.touched && props.invalid) {
        ValidationError = <h5
            className={classes.ValidationError}>
            Please Enter Valid Data for {props.valueType}</h5>
    }
    
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClass.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    
                    {props.elementConfig.options.map(option => (
                        <option
                            value={option.value}
                            key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {ValidationError}
        </div>
    );
}

export default input;