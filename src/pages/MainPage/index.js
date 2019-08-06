/* eslint-disable no-loop-func */
import React, { Component, Fragment } from "react";
import "./main.css";
import Button from "../../components/AButton";
import Numbers from "../../components/Numbers";
import CardPolitico from "../../components/CardPolitico/CardPolitico";
import CardNews from "../../components/CardNews/CardNews";
import Slider from "../../components/Slider";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      approvedLaws: 5,
      votedLaws: 5,
      moneySpent: 15
    };
  }

  render() {
    return (
      <Fragment>
        <main>
          <h1 className="white">Tô de Olho</h1>
          <h3>A plataforma para você acompanhar de perto os seus políticos</h3>
        </main>
        <Button  class="ligth-green" to="/pesquisar">FIQUE DE OLHO</Button>
        <Slider>
          <CardPolitico />
          <CardPolitico />
          <CardPolitico />
          <CardPolitico />
        </Slider>
        <Button class="ligth-green" to="/pesquisar">COMO FUNCIONA ?</Button>
      </Fragment>
    );
  }
}

export default Main;
