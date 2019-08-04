import React from "react";
import './cardNews.css'

const CardNews = props => {
  return (
    <div className="card card-slider">
      <p>{props.children}</p>
    </div>
  );
};

export default CardNews;
