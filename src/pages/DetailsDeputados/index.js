import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import './detailsdeputados.css';
import axios from 'axios';
import LoadingIcon from "../../components/LoadingIcon";
import RadialChart from '../../components/Charts/RadialChartSenadores';
import MessageAttach from '../../components/MessageBox/MessageAttach';

class DetailsDeputados extends Component {
  constructor(props) {
    super(props);
    this.ctx = React.createRef();
    this.state = {
      showVotes: false,
      messageBox: '',
      sessoesPresenca: '',
    }
    this.service = new AuthService();
    
  }
  
  toTitleCase = (str) => {
    const arr = ['da', 'das', 'de', 'do', 'dos', 'e'];
    return str.toLowerCase().split(' ').map(a => arr.includes(a) ? a : a[0].toUpperCase() + a.slice(1)).join(' ');
  }
  
  dateToShow = (date) => {
    const arr = date.split('-');
    return arr[0];
  }

  dateWithBars = (date) => {
    const arr = date.split('-');
    return [arr[2], arr[1], arr[0]].join('/');
  }
  
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/deputados/sessoes/${this.props.match.params.id}/atual`)
    .then(politicianAtual => {
      if (politicianAtual.data.nomeDeputado !== undefined) {
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
                // radius: 1.2,
                style: {
                  fill: '#AB4263',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { angle: sessoes.presente, 
                label: '' + sessoes.presente, 
                subLabel:'Presença',
                style: {
                  fill: '#876DB3',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
            ],
            votacoes: [
              { angle: votos.totalDeVotos, 
                label: '' + votos.totalDeVotos, 
                subLabel:'Votos',
                style: {
                  fill: '#876DB3',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { angle: votos.obstrucao, 
                label: '' + votos.obstrucao, 
                subLabel:'Obstrução',
                style: {
                  fill: '#FAC438',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { angle: votos.abstencao, 
                label: '' + votos.abstencao, 
                subLabel:'Abstenção',
                style: {
                  fill: '#66AB6D',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { angle: votos.totalDeVotacoes - votos.obstrucao - votos.abstencao - votos.totalDeVotos, 
                label: '' + (votos.totalDeVotacoes - votos.obstrucao - votos.abstencao - votos.totalDeVotos), 
                subLabel:'Não registrou voto',
                style: {
                  fill: '#6EBCCC',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
            ],
          },
            votos: {
              sim: votos.sim,
              nao: votos.nao,
              obstrucao: votos.obstrucao,
              abstencao: votos.abstencao,
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
    
    axios.get(`${process.env.REACT_APP_API_URL}/deputados/sessoes/${this.props.match.params.id}/historico`)
    .then(politicianHist => {
      console.log(politicianHist);
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
            abstencao: votos.abstencao,
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
                fill: '#AB4263',
                stroke: 'rgba(0,0,0,0)',
              }
            },
            { angle: sessoes.presente, 
              label: '' + sessoes.presente, 
              subLabel:'Presença',
              style: {
                fill: '#876DB3',
                stroke: 'rgba(0,0,0,0)',
              }
            },
          ],
          votacoes: [
            { angle: votos.totalDeVotos, 
              label: '' + votos.totalDeVotos, 
              subLabel:'Votos',
              style: {
                fill: '#876DB3',
                stroke: 'rgba(0,0,0,0)',
              }
            },
            { angle: votos.obstrucao, 
              label: '' + votos.obstrucao, 
              subLabel:'Obstrução',
              style: {
                fill: '#FAC438',
                stroke: 'rgba(0,0,0,0)',
              }
            },
            { angle: votos.abstencao, 
              label: '' + votos.abstencao, 
              subLabel:'Abstenção',
              style: {
                fill: '#66AB6D',
                stroke: 'rgba(0,0,0,0)',
              }
            },
            { angle: votos.totalDeVotacoes - votos.obstrucao - votos.abstencao - votos.totalDeVotos, 
              label: '' + (votos.totalDeVotacoes - votos.obstrucao - votos.abstencao - votos.totalDeVotos), 
              subLabel:'Não registrou voto',
              style: {
                fill: '#6EBCCC',
                stroke: 'rgba(0,0,0,0)',
              }
            },
          ],
        },

        }
      })
    })
    .catch(e => console.log(e));
  }

  handleChartClick(dp, legis) {
    switch(dp.subLabel) {
      case 'Votos':
        if(legis === 'atual') {
          this.service.sessoesPresentesDeputados('atual', 'votos', this.state.politicianName, [this.state.atual.legislatura])
          .then(res => {
            console.log(res);
            this.setState({
              messageBox: `Lista de votações em que o parlamentar votou:`,
              sessoesPresenca: res,  
            });
          });
        } else if (legis === 'historico') {
          this.service.sessoesPresentesDeputados('historico', 'votos', this.state.politicianName, this.state.historico.legislaturas)
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar votou:`,
              sessoesPresenca: res,  
            });
          });
        }
        break;
      case 'Não registrou voto':
        if(legis === 'atual') {
          this.service.sessoesPresentesDeputados('atual', 'naovot', this.state.politicianName, [this.state.atual.legislatura])
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar não votou:`,
              sessoesPresenca: res,  
            });
          });
        } else if (legis === 'historico') {
          this.service.sessoesPresentesDeputados('historico', 'naovot', this.state.politicianName, this.state.historico.legislaturas)
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar não votou:`,
              sessoesPresenca: res,  
            });
          });
        }
        break;  
      case 'Obstrução':
        if(legis === 'atual') {
          this.service.sessoesPresentesDeputados('atual', 'obstrucao', this.state.politicianName, [this.state.atual.legislatura])
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar obstruiu:`,
              sessoesPresenca: res,  
            });
          });
        } else if (legis === 'historico') {
          this.service.sessoesPresentesDeputados('historico', 'obstrucao', this.state.politicianName, this.state.historico.legislaturas)
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar obstruiu:`,
              sessoesPresenca: res,  
            });
          });
        }
        break;
      case 'Abstenção':
        if(legis === 'atual') {
          this.service.sessoesPresentesDeputados('atual', 'abstencao', this.state.politicianName, [this.state.atual.legislatura])
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar se absteve:`,
              sessoesPresenca: res,  
            });
          });
        } else if (legis === 'historico') {
          this.service.sessoesPresentesDeputados('historico', 'abstencao', this.state.politicianName, this.state.historico.legislaturas)
          .then(res => {
            this.setState({
              messageBox: `Lista de votações em que o parlamentar se absteve:`,
              sessoesPresenca: res,  
            });
          });
        }
        break;  
      case 'Presença':
        if(legis === 'atual') {
          this.service.sessoesPresentesDeputados('atual', 'presenca', this.state.politicianName, [this.state.atual.legislatura])
          .then(res => {
            this.setState({
              messageBox: `Lista de sessões em que o parlamentar esteve presente:`,
              sessoesPresenca: res,  
            });
          });
        } else if (legis === 'historico') {
          this.service.sessoesPresentesDeputados('historico', 'presenca', this.state.politicianName, this.state.historico.legislaturas)
          .then(res => {
            this.setState({
              messageBox: `Lista de sessões em que o parlamentar esteve presente:`,
              sessoesPresenca: res,  
            });
          });
        }
        break;
      case 'Ausência':
        if(legis === 'atual') {
          this.service.sessoesPresentesDeputados('atual', 'ausencia', this.state.politicianName, [this.state.atual.legislatura])
          .then(res => {
            this.setState({
              messageBox: `Lista de sessões em que o parlamentar esteve ausente:`,
              sessoesPresenca: res,  
            });
          });
        } else if (legis === 'historico') {
          this.service.sessoesPresentesDeputados('historico', 'ausencia', this.state.politicianName, this.state.historico.legislaturas)
          .then(res => {
            this.setState({
              messageBox: `Lista de sessões em que o parlamentar esteve ausente:`,
              sessoesPresenca: res,  
            });
          });
        }
        break;
    }
    this.setState({
      showVotes: !this.state.showVotes,
    });
  }

  handleCancelMessageBox() {
    this.setState({
      showVotes: !this.state.showVotes,
      messageBox: '',
      sessoesPresenca: '',
    })
  }
  
  render() {
    const {atual, historico} = this.state;
    return (
      <Fragment>
        { this.state.showVotes && <MessageAttach handleChartClick={() => this.handleChartClick()} title={this.state.messageBox} sessoesPresenca={this.state.sessoesPresenca} handleCancelMessageBox={() => this.handleCancelMessageBox()} dateWithBars={(date) => this.dateWithBars(date)} />}
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
                  className="radialchart"
                  handleChartClick={(dp, legis) => this.handleChartClick(dp, legis)}
                  centerInfo={atual.sessoes.percentualPresenca}
                  data={atual.charts.sessoes} 
                  legis="atual" />
                </div>
                <div className="presenca-sessoes-container">
                  <p>Presença em votações</p>
                  {console.log(atual)}
                  <RadialChart
                  handleChartClick={(dp, legis) => this.handleChartClick(dp, legis)}
                  centerInfo={atual.votos.percentualDeVotos}
                  data={atual.charts.votacoes} 
                  legis="atual" />
                </div>
              </div>
              <hr/>
            </div>
          }
          {this.state.historico ?
            <div className="info-container">
              <div className='legis-container'>
                <p className="legis-text"><span>Histórico de legislaturas:<br/></span> | {this.state.historico.legislaturas.map(legis => {return `${this.dateToShow(legis.dataInicio)} - ${this.dateToShow(legis.dataFim)} | `;})}</p>
              </div>
              <div className="charts-container last">
                <div className="presenca-sessoes-container">
                  <p>Presença em sessões</p>
                  <RadialChart
                  handleChartClick={(dp, legis) => this.handleChartClick(dp, legis)}
                  centerInfo={historico.sessoes.percentualPresenca}
                  data={historico.charts.sessoes} 
                  legis="historico" />
                </div>
                <div className="presenca-sessoes-container">
                  <p>Presença em votações</p>
                  <RadialChart
                  handleChartClick={(dp, legis) => this.handleChartClick(dp, legis)}
                  centerInfo={historico.votos.percentualDeVotos}
                  data={historico.charts.votacoes} 
                  legis="historico" />
                </div>
              </div>
              <hr/>
            </div>
          :
            <div className="loading-icon-historical last">
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