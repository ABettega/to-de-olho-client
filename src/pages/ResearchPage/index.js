import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import CardPolitico from "../../components/CardPolitico/CardPolitico";
import Slider from "../../components/Slider";
import "./researchpage.css";
import { debounce } from 'lodash';

class ResearchPage extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state) {
      this.state = {
        search: "",
        deputados: [],
        senadores: [],
        filterDeputados: [],
        filterSenadores: [],
        senadoresAtuais: [],
        deputadosAtuais: [],
        loginMessage: this.props.location.state.loginMessage
      };
    } else{
      this.state = {
        search: "",
        deputados: [],
        senadores: [],
        filterDeputados: [],
        filterSenadores: [],
        senadoresAtuais: [],
        deputadosAtuais: [],
      };
    }
      
    this.service = new AuthService();
    this.handleChange = this.handleChange.bind(this)
  }

  checkAuto() {
    if (this.props.user) {
      this.service.getFavorites(this.props.user.email)
        .then(ret => {
          this.setState({
            favDep: ret.depFavoritos,
            favSen: ret.senFavoritos
          })
        })
        .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    this.checkAuto();
    this.service.deputadosatuais().then(response => {
      this.setState({
        deputadosAtuais: [...response],
      });
    });
    this.service
      .senadoresatuais()
      .then(response => {
        this.setState({
          senadoresAtuais: [...response],
        });
      })
      .catch(err => console.log(err));

    this.service
      .deputadostodos()
      .then(response => {
        this.setState({
          deputados: [...response],
          filterDeputados: [...response],
        });
      })
      .catch(err => console.log(err));
      
    this.service
      .senadorestodos()
      .then(response => {
        console.log(response)
        this.setState({
          senadores: [...response],
        });
      })
      .catch(err => console.log(err));
  }

  setFiltered = debounce(query => {
    this.setState({
      filterDeputados: this.state.deputados.filter((deputado) =>
        deputado.nomeDeputado
          .toUpperCase()
          .includes(query.toUpperCase())
      ),
      filterSenadores: this.state.senadores.filter((senador) =>
        senador.IdentificacaoParlamentar.NomeParlamentar.toUpperCase().includes(
          query.toUpperCase()
        )
      )
    });
  }, 500);

  handleChange(event) {
    const { value } = event.target;
    this.setState({search: value});
    this.setFiltered(value);
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
            <img className="congresso-img" src="/images/senado.png" />

            {this.state.search === "" 
            ? 
              <Slider>
              {this.state.senadoresAtuais
                .map(senador => {
                  return (
                    <CardPolitico
                      id={senador.IdentificacaoParlamentar.CodigoParlamentar}
                      siglaPartido={senador.IdentificacaoParlamentar.siglaPartidoParlamentar}
                      politician="/senador/"
                      politicianName={this.titleCase(
                        senador.IdentificacaoParlamentar.NomeParlamentar
                      )}
                      uf={senador.IdentificacaoParlamentar.UfParlamentar}
                      backImage={
                        senador.IdentificacaoParlamentar.UrlFotoParlamentar
                      }
                      user={this.props.user}
                      fav={this.state.favSen}
                      siglaPartido={senador.IdentificacaoParlamentar.SiglaPartidoParlamentar}
                    />
                  );
                })}
            </Slider> 
            : 
            <Slider>
            {this.state.filterSenadores
              .map(senador => {
                return (
                  <CardPolitico
                    id={senador.IdentificacaoParlamentar.CodigoParlamentar}
                    politician="/senador/"
                    politicianName={this.titleCase(
                      senador.IdentificacaoParlamentar.NomeParlamentar
                    )}
                    uf={senador.IdentificacaoParlamentar.UfParlamentar || senador.UltimoMandato.UfParlamentar}
                    backImage={
                      senador.IdentificacaoParlamentar.UrlFotoParlamentar
                    }
                    user={this.props.user}
                    fav={this.state.favDep}
                    siglaPartido={senador.IdentificacaoParlamentar.siglaPartidoParlamentar}
                  />
                );
              })}
          </Slider>
            }
          </div>
          <div className="half-page">
          <img className="congresso-img" src="./images/deputados.png" />

          {this.state.search === '' 
          ? 
          <Slider>
            {this.state.deputadosAtuais
              .map(deputado => {
                return (
                  <CardPolitico
                    key={deputado.id}
                    id={deputado.id}
                    politician="/deputado/"
                    politicianName={this.titleCase(deputado.nomeDeputado)}
                    uf={deputado.siglaUf}
                    backImage={deputado.urlFoto}
                    user={this.props.user}
                    fav={this.state.favDep}
                    siglaPartido={deputado.siglaPartido}
                  />
                );
              })}
          </Slider>
          :
          <Slider>
            {this.state.filterDeputados
              .map(deputado => {
                return (
                  <CardPolitico
                    key={deputado.id}
                    id={deputado.id}
                    politician="/deputado/"
                    politicianName={this.titleCase(deputado.nomeDeputado)}
                    uf={deputado.siglaUf}
                    backImage={deputado.urlFoto}
                    user={this.props.user}
                    fav={this.state.favDep}
                    siglaPartido={deputado.siglaPartido}
                  />
                );
              })}
          </Slider>
          }
          </div>
        </div>
      </>
    );
  }
}

export default ResearchPage;
