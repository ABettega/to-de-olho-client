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
          <h1 className="white">tô de olho</h1>
          <h3>A plataforma para você acompanhar de perto os seus políticos</h3>
        </main>
        <Button  class="ligth-green" to="/pesquisar">FIQUE DE OLHO</Button>
        <Slider>
        <CardPolitico 
          id='945'
          politician="/senador/"
          politicianName='Alvaro Dias'
          uf='PR'
          backImage='http://www.senado.leg.br/senadores/img/fotos-oficiais/senador945.jpg'
          siglaPartido='PODEMOS'
        />
        <CardPolitico 
          id='5666'
          politician="/senador/"
          politicianName='Major Olimpio'
          uf='RO'
          backImage='http://www.senado.leg.br/senadores/img/fotos-oficiais/senador5666.jpg'
          siglaPartido='PSL'
        />
        <CardPolitico 
          id='178956'
          politician="/deputado/"
          politicianName='Mariana Carvalho'
          uf='RO'
          backImage='https://www.camara.leg.br/internet/deputado/bandep/178956.jpg'
          siglaPartido='PSDB'
        />
        <CardPolitico 
          id='204464'
          politician='/deputado/'
          politicianName='Talíria Petrone'
          uf='RJ'
          backImage='https://www.camara.leg.br/internet/deputado/bandep/204464.jpgmaior.jpg'
          siglaPartido='PSOL'
        />
        </Slider>
        <Button class="ligth-green" to="/pesquisar">COMO FUNCIONA ?</Button>
      </Fragment>
    );
  }
}

export default Main;
/*
className="card-politician-horizontal"
                  key={senador.IdentificacaoParlamentar.CodigoParlamentar}
                  id={senador.IdentificacaoParlamentar.CodigoParlamentar}
                  politician="/senador/"
                  politicianName={this.titleCase(
                    senador.IdentificacaoParlamentar.NomeParlamentar
                  )}
                  uf={senador.IdentificacaoParlamentar.UfParlamentar}
                  backImage={
                    senador.IdentificacaoParlamentar.UrlFotoParlamentar
                  }
                  */