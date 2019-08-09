import React from 'react';
import "./input.css"

const Input = (props) => {
    return ( 
        <>
        <input id={props.name} required={props.required} name={props.name} type={props.type} value={props.value} onChange={(e) => props.change(e)}></input>
        <label for={props.name} className="floating-label">{props.placeholder}</label>
        </>
     );
}
 
export default Input;