import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import CardPolitico from "../../components/CardPolitico/CardPolitico";
import Slider from "../../components/Slider";
import "./researchpage.css";

class ResearchPage extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state){
      this.state = {
        search: "",
        deputadostodos: [],
        deputadosatuais:[],
        senadorestodos: [],
        senadoresatuais:[],
        researchdeputados:[],
        researchsenadores:[],
        loginMessage: this.props.location.state.loginMessage
      };
    } else{
      this.state = {
        search: "",
        deputadostodos: [],
        deputadosatuais:[],
        senadorestodos: [],
        senadoresatuais:[],
        researchdeputados:[],
        researchsenadores:[],
      };
    }
      
    this.service = new AuthService();
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.service.deputadosatuais().then(response => {
      this.setState({
        researchdeputados: [...response],
        deputadosatuais: [...response]
      });
    });
    this.service
      .senadoresatuais()
      .then(response => {
        this.setState({
          senadoresatuais: [...response],
          researchsenadores: [...response]
        });
      })
      .catch(err => console.log(err));

    this.service
      .deputadostodos()
      .then(response => {
        this.setState({
          deputadostodos: [...response]
        });
      })
      .catch(err => console.log(err));
      
    this.service.senadorestodos()
      .then(response => {
        this.setState({
          senadorestodos: [...response]
        });
      })
      .catch(err => console.log(err));
  }

  chooseAllorSome() {
    if (this.state.search === "") {
      let copyDeputadosAtuais = [...this.state.deputadosatuais]
      let copySenadoresAtuais = [...this.state.senadoresatuais]
      this.setState({
        researchdeputados: copyDeputadosAtuais,
        researchsenadores: copySenadoresAtuais
      })
    } else {
      let copyDeputadosTodos = [...this.state.deputadostodos]
      let copySenadoresTodos = [...this.state.senadorestodos]
      this.setState({
        researchdeputados: copyDeputadosTodos,
        researchsenadores: copySenadoresTodos
      })
    }
  }

  async handleChange(event) {
    const { value } = event.target;
    await this.setState({ search: value });
    await this.chooseAllorSome()
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
            <Slider>
              {this.state.researchsenadores
                .filter(senador =>
                  senador.IdentificacaoParlamentar.NomeParlamentar.toUpperCase().includes(
                    this.state.search.toUpperCase()
                  )
                )
                .map(senador => {
                  return (
                    <CardPolitico
                      key={senador.IdentificacaoParlamentar.CodigoParlamentar}
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
                    />
                  );
                })}
            </Slider>
          </div>
          <div className="half-page">
            <img className="congresso-img" src="/images/deputados.png" />
            <Slider>
              {this.state.researchdeputados
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
                      siglaPartido={deputado.siglaPartido}
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
