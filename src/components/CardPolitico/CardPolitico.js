import React from "react";
import { Link } from "react-router-dom";
import './cardPolitico.css'

const CardPolitico = props => {
  return (
    <Link className="card-slider" to={{
      pathname: props.politician + props.id, 
      state: {
        politicianName: props.politicianName,
        uf: props.uf,
        backImage: props.backImage,
      }
      }}>
      <div className="size-100">
      <div style={{backgroundImage: `url(${props.backImage})`}} className="card"/>
      <div className="partido"></div>
      <div className="names">
        <p>{props.politicianName}</p>
        <p>{props.uf}</p>
      </div>
    </div></Link>
  );
};

export default CardPolitico;
