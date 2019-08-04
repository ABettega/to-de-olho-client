import React from "react";
import './cardPolitico.css'

const CardPolitico = props => {
  return (
    <div className="card card-slider">
      <p>{props.children}</p>
    </div>
  );
};

export default CardPolitico;
