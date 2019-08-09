import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import { Link } from "react-router-dom";
import CardPolitico from "../../components/CardPolitico/CardPolitico";
import Slider from "../../components/Slider";
import "./dashboard.css";
import Axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      depFavoritos: [],
      senFavoritos: [],
      deputadostodos: [],
      senadorestodos: [],
      partidosSenadores: [],
    };
    this.service = new AuthService();
    this.axios = Axios.create({})
  }

  componentDidMount() {
    this.service.loggedin().then(response => {
      let { firstName, depFavoritos, senFavoritos } = response;

      // console.log(depFavoritos, senFavoritos)

      this.setState({
        username: firstName,
        depFavoritos: depFavoritos,
        senFavoritos: senFavoritos
      });
    });
    this.service
      .deputadostodos()
      .then(response => {
        this.setState({
          deputadostodos: [...response]
        });
      })
      .catch(err => console.log(err));

    this.service
      .senadorestodos()
      .then(response => {
        this.setState({
          senadorestodos: [...response]
        });
      })
      .catch(err => console.log(err));
  }

  titleCase(str) {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  render() {
    return (
      <Fragment>
      <div id="dashboard">
        <div>
          <div id="user">
            <p>Tô de Olho Neles</p>
          </div>
        </div>
        <div id="politicians">
          <Slider>
          {this.state.senadorestodos
            .filter(senador =>
              this.state.senFavoritos.includes(
                String(senador.IdentificacaoParlamentar.CodigoParlamentar)
              )
            )
            .map((senador, idx) => {
              this.axios.get(`http://legis.senado.leg.br/dadosabertos/senador/${senador.IdentificacaoParlamentar.CodigoParlamentar}`)
                .then((sen) => {
                  // let counter = 0;
                  if (this.state.partidosSenadores.length < this.state.senFavoritos.length) {
                    this.setState({
                      partidosSenadores: [...this.state.partidosSenadores, sen.data.DetalheParlamentar.Parlamentar.FiliacaoAtual.Partido.SiglaPartido]
                    })
                  }
                  
                  console.log(this.state.partidosSenadores)
                })
                .catch((e) => console.log(e))
                return (
                  <CardPolitico
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
                    siglaPartido={this.state.partidosSenadores[idx]}
                  />
                  );
            })}
          {this.state.deputadostodos
            .filter(deputado =>
              this.state.depFavoritos.includes(String(deputado.id))
            )
            .map(deputado => {
              return (
                <CardPolitico
                  className="card-politician-horizontal"
                  key={deputado.id}
                  id={deputado.id}
                  politician="/deputado/"
                  politicianName={this.titleCase(deputado.nomeDeputado)}
                  uf={deputado.siglaUf}
                  backImage={deputado.urlFoto}
                  siglaPartido={deputado.siglaPartido}
                />
              );
            })}

          </Slider>
         
        </div>
      </div>
      </Fragment>
    );
  }
}

export default Dashboard;
