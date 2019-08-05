import React from 'react';
import './slider.css'

const Slider = (props) => {
    return (
    <div className="slider">
        {props.children}
    </div>
     );
}
 
export default Slider;