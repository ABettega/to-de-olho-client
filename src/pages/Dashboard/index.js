import React, { Component } from "react";
import AuthService from "../../components/Auth/auth-services";
import { Link } from "react-router-dom";
import CardPolitico from "../../components/CardPolitico/CardPolitico";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      depFavoritos: [],
      senFavoritos: [],
      deputadostodos: [],
      senadorestodos: [],
    };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.service.loggedin().then(response => {
      let { firstName, depFavoritos, senFavoritos } = response;

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
      <div id="dashboard">
        <div>
          <div id="user">
            <p>{this.state.username}</p>
            <a href="#">Editar</a>
          </div>
        </div>
        <div>
          {this.state.senadorestodos
            .filter(senador =>
              this.state.senFavoritos.includes(
                String(senador.IdentificacaoParlamentar.CodigoParlamentar)
              )
            )
            .map(senador => {
              return (
                <CardPolitico
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
                  className="add-poli"
                  user={this.state.user}
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
                  className="card-politician-horizontal add-poli"
                  key={deputado.id}
                  id={deputado.id}
                  politician="/deputado/"
                  politicianName={this.titleCase(deputado.nomeDeputado)}
                  uf={deputado.siglaUf}
                  backImage={deputado.urlFoto}
                  user={this.state.user}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
