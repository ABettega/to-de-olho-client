import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import CardPolitico from "../../components/CardPolitico/CardPolitico";
import Slider from "../../components/Slider";
import "./researchpage.css";

class ResearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      deputados: [],
      senadores: []
    };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.service
      .deputados()
      .then(response => {
        console.log(response);
        this.setState({
          deputados: [...response]
        });
      })
      .catch(err => console.log(err));
    this.service
      .senadores()
      .then(response => {
        this.setState({
          senadores: [...response]
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ search: value });
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
      <>
       <input
            name="name"
            type="text"
            value={this.state.search}
            placeholder="Pesquise seu político"
            onChange={e => this.handleChange(e)}
            className="pesquisar"
          />
        <div className="center">
         
          <div className="half-page">
            <img className="congresso-img" src="./images/senado.png" />
            <Slider>
              {this.state.senadores
                .filter(senador =>
                  senador.IdentificacaoParlamentar.NomeParlamentar.toUpperCase().includes(
                    this.state.search.toUpperCase()
                  )
                )
                .map(senador => {
                  return (
                    <CardPolitico
                      key={senador._id}
                      id={senador._id}
                      politician="/senador/"
                      politicianName={this.titleCase(
                        senador.IdentificacaoParlamentar.NomeParlamentar
                      )}
                      uf={senador.IdentificacaoParlamentar.UfParlamentar}
                      backImage={
                        senador.IdentificacaoParlamentar.UrlFotoParlamentar
                      }
                    />
                  );
                })}
            </Slider>
          </div>
          <div className="half-page">
          <img className="congresso-img" src="./images/deputados.png" />
          <Slider>
            {this.state.deputados
              .filter(deputado =>
                deputado.nomeDeputado
                  .toUpperCase()
                  .includes(this.state.search.toUpperCase())
              )
              .map(deputado => {
                return (
                  <CardPolitico
                    key={deputado.id}
                    id={deputado.id}
                    politician="/deputado/"
                    politicianName={this.titleCase(deputado.nomeDeputado)}
                    uf={deputado.siglaUf}
                    backImage={deputado.urlFoto}
                  />
                );
              })}
          </Slider>
          </div>
        </div>
      </>
    );
  }
}

export default ResearchPage;
