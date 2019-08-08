import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import './detailsdeputados.css';
import axios from 'axios';
import LoadingIcon from "../../components/LoadingIcon";
import RadialChart from '../../components/Charts/RadialChart';
import MessageAttach from '../../components/MessageBox/MessageAttach';

class DetailsDeputados extends Component {
  constructor(props) {
    super(props);
    this.ctx = React.createRef();
    this.state = {
      showVotes: false,
    }
    this.service = new AuthService();
    
  }
  
  toTitleCase = (str) => {
    const arr = ['da', 'das', 'de', 'do', 'dos', 'e'];
    return str.toLowerCase().split(' ').map(a => arr.includes(a) ? a : a[0].toUpperCase() + a.slice(1)).join(' ');
  }
  
  dateToShow = (date) => {
    const arr = date.split('-');
    return [arr[2], arr[1], arr[0]].join('/');
  }
  
  componentDidMount() {
    axios.get(`http://localhost:5000/deputados/sessoes/${this.props.match.params.id}/atual`)
    .then(politicianAtual => {
      if (politicianAtual.data) {
        const { sessoes, votos, nomeDeputado, partido, uf, foto, legislatura } = politicianAtual.data;
        this.setState({
          politicianName: this.toTitleCase(nomeDeputado),
          partido: partido,
          uf: uf,
          foto: foto,
          atual: {
            legislatura: legislatura,
            sessoes: {
              total: sessoes.total,
              presente: sessoes.presente,
              percentualPresenca: sessoes.percentualPresenca,
            },
            charts: {
              sessoes: [
              { angle: sessoes.total - sessoes.presente, 
                label: '' + (sessoes.total - sessoes.presente), 
                subLabel:'Ausência',
                style: {
                  fill: 'rgba(0, 0, 0, 0)',
                }
              },
              { angle: sessoes.presente, 
                label: '' + sessoes.presente, 
                subLabel:'Presença'},
            ],
            votacoes: [
              { angle: votos.totalDeVotos, 
                label: '' + votos.totalDeVotos, 
                subLabel:'Votos',
              },
              { angle: votos.obstrucao, 
                label: '' + votos.obstrucao, 
                subLabel:'Obstrução'
              },
              { angle: votos.totalDeVotacoes - votos.obstrucao - votos.totalDeVotos, 
                label: '' + (votos.totalDeVotacoes - votos.obstrucao - votos.totalDeVotos), 
                subLabel:'Não registrou voto',
                angleDomain: 1.5,
                style: {
                  fill: 'rgba(0, 0, 0, 0)',
                }
              },
            ],
          },
            votos: {
              sim: votos.sim,
              nao: votos.nao,
              obstrucao: votos.obstrucao,
              art17: votos.art17,
              totalDeVotos: votos.totalDeVotos,
              totalDeVotacoes: votos.totalDeVotacoes,
              percentualDeVotos: votos.percentualDeVotos,
            },
          }
        });
      }
    })
    .catch(e => console.log(e));
    
    axios.get(`http://localhost:5000/deputados/sessoes/${this.props.match.params.id}/historico`)
    .then(politicianHist => {
      const { legislaturas, sessoes, votos, nomeDeputado, partido, uf, foto } = politicianHist.data;
      this.setState({
        politicianName: this.toTitleCase(nomeDeputado),
        partido: partido,
        uf: uf,
        foto: foto,
        historico: {
          legislaturas: legislaturas,
          sessoes: {
            total: sessoes.total,
            presente: sessoes.presente,
            percentualPresenca: sessoes.percentualPresenca,
          },
          votos: {
            sim: votos.sim,
            nao: votos.nao,
            obstrucao: votos.obstrucao,
            art17: votos.art17,
            totalDeVotos: votos.totalDeVotos,
            totalDeVotacoes: votos.totalDeVotacoes,
            percentualDeVotos: votos.percentualDeVotos,
          },
          charts: {
            sessoes: [
            { angle: sessoes.total - sessoes.presente, 
              label: '' + (sessoes.total - sessoes.presente), 
              subLabel:'Ausência',
              style: {
                fill: 'rgba(0, 0, 0, 0)',
              }
            },
            { angle: sessoes.presente, 
              label: '' + sessoes.presente, 
              subLabel:'Presença'},
          ],
          votacoes: [
            { angle: votos.totalDeVotos, 
              label: '' + votos.totalDeVotos, 
              subLabel:'Votos',
            },
            { angle: votos.obstrucao, 
              label: '' + votos.obstrucao, 
              subLabel:'Obstrução'
            },
            { angle: votos.totalDeVotacoes - votos.obstrucao - votos.totalDeVotos, 
              label: '' + (votos.totalDeVotacoes - votos.obstrucao - votos.totalDeVotos), 
              subLabel:'Não registrou voto',
              angleDomain: 1.5,
              style: {
                fill: 'rgba(0, 0, 0, 0)',
              }
            },
          ],
        },

        }
      })
    })
    .catch(e => console.log(e));
  }

  handleChartClick() {
    this.setState({
      showVotes: !this.state.showVotes,
    })
  }
  
  render() {
    const {atual, historico} = this.state;
    console.log()
    return (
      <Fragment>
        { this.state.showVotes && <MessageAttach handleChartClick={() => this.handleChartClick()} title="Oi"/>}
        {(this.state.atual || this.state.historico) ?
          <div>
            <div className="politician-info-container">
              <img src={this.state.foto} alt={`Foto do deputado ${this.state.politicianName}`} />
              <div className="politician-info">
                <p>Nome: {this.state.politicianName}</p>
                <p>Partido: {this.state.partido}</p>
                <p>UF: {this.state.uf}</p>
              </div>
            </div>
          {this.state.atual &&
            <div className="info-container">
              <div className='legis-container'>
                <p className="legis-text"><span>Legislatura:</span> {this.dateToShow(atual.legislatura.dataInicio)} - {this.dateToShow(atual.legislatura.dataFim)}</p>
              </div>
              <div className="charts-container">
                <div className="presenca-sessoes-container">
                  <p>Presença em sessões</p>
                  <RadialChart
                  handleChartClick={() => this.handleChartClick()}
                  centerInfo={atual.sessoes.percentualPresenca}
                  data={atual.charts.sessoes} />
                </div>
                <div className="presenca-sessoes-container">
                  <p>Presença em votações</p>
                  <RadialChart
                  handleChartClick={() => this.handleChartClick()}
                  centerInfo={atual.votos.percentualDeVotos}
                  data={atual.charts.votacoes} />
                </div>
              </div>
              <hr/>
            </div>
          }
          {this.state.historico ?
            <div className="info-container">
              <div className='legis-container'>
                <p className="legis-text"><span>Histórico de legislaturas:</span> | {this.state.historico.legislaturas.map(legis => {return `${this.dateToShow(legis.dataInicio)} - ${this.dateToShow(legis.dataFim)} | `;})}</p>
              </div>
              <div className="charts-container">
                <div className="presenca-sessoes-container">
                  <p>Presença em sessões</p>
                  <RadialChart
                  handleChartClick={() => this.handleChartClick()}
                  centerInfo={historico.sessoes.percentualPresenca}
                  data={historico.charts.sessoes} />
                </div>
                <div className="presenca-sessoes-container">
                  <p>Presença em votações</p>
                  <RadialChart
                  handleChartClick={() => this.handleChartClick()}
                  centerInfo={historico.votos.percentualDeVotos}
                  data={historico.charts.votacoes} />
                </div>
              </div>
              <hr/>
            </div>
          :
            <div className="loading-icon-historical">
              <LoadingIcon />
              <p>Carregando</p>
            </div>
          }
          </div>
        :
          <div className="loading-icon-container">
            <LoadingIcon />
            <p>Carregando</p>
          </div>
        }
      </Fragment >
    );
  }
}

export default DetailsDeputados;


{/* <ul> Legislaturas:
  {this.state.legislaturas.map((legis, idx) => {
    return (
      <ul key={idx} className="legislaturas-ul">
      Legislatura {idx + 1}:
      <li>De: {legis.dataInicio}</li>
      <li>A: {legis.dataFim}</li>
      </ul>
      );
    })}
    <li />
  </ul> */}