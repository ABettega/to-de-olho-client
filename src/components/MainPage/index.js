/* eslint-disable no-loop-func */
import React, { Component, Fragment } from "react";
import "./main.css";
import Button from "../Button";
import Numbers from "../Numbers";
import CardPolitico from "../CardPolitico/CardPolitico";
import CardNews from "../CardNews/CardNews";
import Slider from "../Slider";

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
          <h3>A melhor plataforma para você acompanhar de perto os seus políticos</h3>
          <Button class="ligth-green">FIQUE DE OLHO</Button>
        </main>
        <Numbers number={this.state.votedLaws} lawName="votedLaws">
          Projetos Votados
        </Numbers>
        <Numbers number={this.state.approvedLaws} lawName="approvedLaws">
          Projetos Aprovados
        </Numbers>
        <Numbers number={this.state.moneySpent} lawName="moneySpent">
          Dinheiro Gasto
        </Numbers>
        <Slider>
          <CardPolitico />
          <CardPolitico />
          <CardPolitico />
          <CardPolitico />
        </Slider>
        <Button class="ligth-green">FIQUE DE OLHO</Button>
        <h2>NEWS</h2>
        <Slider>
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
        </Slider>
      </Fragment>
    );
  }
}

export default Main;
