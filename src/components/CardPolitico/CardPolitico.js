import React from "react";
import { Link } from "react-router-dom";
import './cardPolitico.css'

const CardPolitico = props => {
  return (
     <div style={{backgroundImage: `url(${props.backImage})`}} className="card card-slider">
      <Link className="nome-card-politico" to={"/deputados/"+ props.id}>{props.children}</Link>
    </div>
  );
};

export default CardPolitico;
