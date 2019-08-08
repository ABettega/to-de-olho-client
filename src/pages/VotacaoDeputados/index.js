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
      <div>
      {this.state.proposicao !== '' ?
      <div>
        <p><span className="strong">Proposição:</span> {documento.siglaTipo} {documento.numero}/{documento.ano} - {this.proposicaoCamelCase(proposicao)}</p>
        <p><span className="strong">Modo:</span> {modo}</p>
        <p><span className="strong">Data de votação:</span> {data}</p>
        <table>
          <thead>
            <tr>
              <th>Parlamentar</th>
              <th>Voto</th>
            </tr>
          </thead>
          <tbody>
            {votos && votos.map(voto => {
              return (
                <tr>
                  <td>
                    <a onClick={(e) => this.redirectToDeputado(e)} href={'#'} className="voto-link-list">
                      {voto.deputado}
                    </a>
                  </td>
                  <td>{voto.voto}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
        </div>
        :
        <div className="loading-icon-container">
          <LoadingIcon />
          <p>Carregando</p>
        </div>
      }
      </div>
    );
  }
}
 
export default VotacaoDeputados;