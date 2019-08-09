import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import './VotacaoDeputados.css';
import LoadingIcon from '../../components/LoadingIcon/index';

class VotacaoDeputados extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      documento: '', 
      proposicao: '', 
      modo: '',
      votos: '',
      data: '',
     }
    this.service = new AuthService();
  }

  proposicaoCamelCase(proposicao) {
      return proposicao[0] + proposicao.slice(1).toLowerCase();
  }

  redirectToDeputado(event) {
    this.service.getOneDeputado(event.target.innerHTML.toUpperCase())
    .then(res => this.props.history.push(`/deputado/${res.id}`))
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.service.detailsVotacao(this.props.match.params.idVotacao)
    .then(res => {
      this.setState({
        documento: res.documento, 
        proposicao: res.proposicao, 
        modo: res.modo,
        votos: res.votos,
        data: res.data,
        infoVotacao: res.infoVotacao,
      });
    })
    .catch(e => console.log(e));
  }

  render() { 
    const {documento, proposicao, modo, votos, data} = this.state;
    return ( 
      <div className="container">
      <div className="white-box">
      {this.state.proposicao !== '' ?
      <div className="title-table-container">
        <div className="title-container">
          <p className="title"><span>Proposição:</span> {documento.siglaTipo} {documento.numero}/{documento.ano} - {this.proposicaoCamelCase(proposicao)}</p>
          <p className="title"><span>Modo:</span> {modo}</p>
          <p className="title"><span>Data de votação:</span> {data}</p>
        </div>
      <div className="table-container">
        <table className="tabela-votos">
          <thead>
            <tr>
              <th style={{textAlign: "left"}}>Parlamentar</th>
              <th>Voto</th>
            </tr>
          </thead>
          <tbody>
            {votos && votos.map((voto, index) => {
              return (
                <Fragment className="table-voto">
                {index % 2 === 0 ?
                <tr className="voto-link list">
                  <td>
                    <a onClick={(e) => this.redirectToDeputado(e)} href={'#'} className="link-dep">
                      {voto.deputado}
                    </a>
                  </td>
                  <td className="voto">{voto.voto}</td>
                </tr>
                    :
                <tr className="voto-link list2">
                  <td>
                  <a onClick={(e) => this.redirectToDeputado(e)} href={'#'} className="link-dep">
                      {voto.deputado}
                    </a>
                  </td>
                  <td className="voto">{voto.voto}</td>
                </tr>
                    }
                </Fragment>
              )
            })
            }
          </tbody>
        </table>
        </div>
        </div>
        :
        <div className="loading-icon-container">
          <LoadingIcon />
          <p>Carregando</p>
        </div>
      }
      </div>
      </div>
    );
  }
}
 
export default VotacaoDeputados;