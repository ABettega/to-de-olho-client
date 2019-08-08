import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import './detailssenadores.css';
import axios from 'axios';
import LoadingIcon from "../../components/LoadingIcon";
import RadialChart from '../../components/Charts/RadialChart';

class DetailsSenadores extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ctx = React.createRef();
    this.service = new AuthService();
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/senadores/${this.props.match.params.id}/sessoes/`)
      .then((res) => {
        const {
          nome,
          UrlFotoParlamentar,
          sigla,
          uf,
          mandatos,
          diasDeLicenca,
          diasEmAP,
          diasEmMissao,
          faltasSenador,
          naoVotou,
          obstrucoes,
          totalDeSessoes,
          presencaPorcentagem,
          totalDeVotos,
          votosRegistrados,
        } = res.data;

        this.setState({
          nome,
          UrlFotoParlamentar,
          sigla,
          uf,
          atual: {
            diasDeLicenca,
            diasEmAP,
            diasEmMissao,
            faltasSenador,
            naoVotou,
            obstrucoes,
            presencaPorcentagem,
            totalDeVotos,
            totalDeSessoes,
            votosRegistrados,
            mandatos,
            charts: {
              sessoes: [
                { 
                  angle: res.data.faltasSenador, 
                  label: '' + res.data.faltasSenador, 
                  subLabel:'Ausência',
                  style: {
                    fill: '#AB4263',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
                { 
                  angle: res.data.diasDeLicenca, 
                  label: '' + res.data.diasDeLicenca, 
                  subLabel:'Licença',
                  style: {
                    fill: '#66AB6D',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
                { 
                  angle: res.data.diasEmAP, 
                  label: '' + res.data.diasEmAP, 
                  subLabel:'Atividades Culturais',
                  style: {
                    fill: '#617888',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
                { 
                  angle: res.data.diasEmMissao, 
                  label: '' + res.data.diasEmMissao, 
                  subLabel:'Dias em Missão',
                  style: {
                    fill: '#FFA3C9',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
                { 
                  angle: res.data.naoVotou, 
                  label: '' + res.data.naoVotou, 
                  subLabel:'Presente mas não votou',
                  style: {
                    fill: '#6EBCCC',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
                { 
                  angle: res.data.obstrucoes, 
                  label: '' + res.data.obstrucoes, 
                  subLabel:'Obstruções',
                  style: {
                    fill: '#FAC438',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
                { 
                  angle: res.data.totalDeVotos, 
                  label: '' + res.data.totalDeVotos, 
                  subLabel:'Presença',
                  style: {
                    fill: '#876DB3',
                    stroke: 'rgba(0,0,0,0)',
                  }
                },
              ]},
          },
        });
      })
      .catch(e => console.log(e));
    
    axios.get(`http://localhost:5000/senadores/historico/sessoes/${this.props.match.params.id}`)
      .then((res) => {
        const {
          nome,
          UrlFotoParlamentar,
          sigla,
          uf,
        } = res.data;

        const {
          mandatos,
          diasDeLicenca,
          diasEmAP,
          diasEmMissao,
          faltasSenador,
          naoVotou,
          obstrucoes,
          presencaPorcentagem,
          totalDeVotos,
          totalDeSessoes,
          votosRegistrados,
        } = res.data.historico;

        this.setState({
          nome,
          UrlFotoParlamentar,
          sigla,
          uf,
          historico: {
            diasDeLicenca,
            diasEmAP,
            diasEmMissao,
            faltasSenador,
            naoVotou,
            obstrucoes,
            presencaPorcentagem,
            totalDeVotos,
            totalDeSessoes,
            votosRegistrados,
            mandatos,
            charts: {
              sessoes: [
              { 
                angle: res.data.historico.faltasSenador, 
                label: '' + res.data.historico.faltasSenador, 
                subLabel:'Ausência',
                style: {
                  fill: '#AB4263',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { 
                angle: res.data.historico.diasDeLicenca, 
                label: '' + res.data.historico.diasDeLicenca, 
                subLabel:'Licença',
                style: {
                  fill: '#66AB6D',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { 
                angle: res.data.historico.diasEmAP, 
                label: '' + res.data.historico.diasEmAP, 
                subLabel:'Atividades Culturais',
                style: {
                  fill: '#617888',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { 
                angle: res.data.historico.diasEmMissao, 
                label: '' + res.data.historico.diasEmMissao, 
                subLabel:'Dias em Missão',
                style: {
                  fill: '#FFA3C9',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { 
                angle: res.data.historico.naoVotou, 
                label: '' + res.data.historico.naoVotou, 
                subLabel:'Presente mas não votou',
                style: {
                  fill: '#6EBCCC',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { 
                angle: res.data.historico.obstrucoes, 
                label: '' + res.data.historico.obstrucoes, 
                subLabel:'Obstruções',
                style: {
                  fill: '#FAC438',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              { 
                angle: res.data.historico.totalDeVotos, 
                label: '' + res.data.historico.totalDeVotos, 
                subLabel:'Presença',
                style: {
                  fill: '#876DB3',
                  stroke: 'rgba(0,0,0,0)',
                }
              },
              ]
            },
          },
        });
      })
      .catch(e => console.log(e));
  }

  handleChartClick() {
    this.setState({
      showVotes: !this.state.showVotes,
    })
  }

  dateToShow = (date) => {
    if (date !== undefined && String(date.slice(-1)).length >= 1) {
      const arr = String(date.slice(-1)).split('-');
      return [arr[2], arr[1], arr[0]].join('/');
    } 
  }

  render() {
    return (
      <Fragment>
        <div className="App">
      </div>
         {(this.state.atual || this.state.historico) ?
          <div>
            <div className="politician-info-container">
              <img src={this.state.UrlFotoParlamentar} alt={`Foto do deputado ${this.state.nome}`} />
              <div className="politician-info">
                <p>Nome: {this.state.nome}</p>
                <p>Partido: {this.state.sigla}</p>
                <p>UF: {this.state.uf}</p>
              </div>
            </div>
            {this.state.atual.totalDeSessoes !== 0 &&
            <div className="info-container">
              <div className='legis-container'>
                {
                  (this.state.atual.mandatos.dataFim === undefined) ?
                  <p className="legis-text"><span>Legislatura:</span> <br></br> {this.state.atual.mandatos.dataInicio}</p> :
                  <p className="legis-text"><span>Legislatura:</span> <br></br> {this.dateToShow(this.state.atual.mandatos.dataInicio)} - {this.dateToShow(this.state.atual.mandatos.dataFim)}</p>
                }
              </div>
              <div className="charts-container">
                <div className="presenca-sessoes-container">
                  <p>Presença em sessões</p>
                  <RadialChart
                  handleChartClick={() => this.handleChartClick()}
                  centerInfo={this.state.atual.presencaPorcentagem + '%'}
                  data={this.state.atual.charts.sessoes}
                  total={this.state.atual.totalDeSessoes} />
                </div>
              </div>
              <hr/>
            </div>
          }
          {this.state.historico ?
            <div className="info-container">
              <div className='legis-container'>

              {
                (this.state.historico.mandatos.dataFim === undefined) ?
                <p className="legis-text"><span>Histórico de legislaturas: Primeira legislatura</span>
                <br></br></p> :
                <p className="legis-text"><span>Histórico de legislaturas: </span><br></br>
                {Object.values(this.state.historico.mandatos).map(legis => {return `${legis[0].slice(0, 4)} - ${legis[1].slice(0, 4)} | `})} {this.state.historico.mandatos.dataInicio.slice(-1)[0].slice(0, 4)} - {this.state.historico.mandatos.dataFim.slice(-1)[0].slice(0, 4)}</p>
              }
              </div>
              <div className="charts-container">
                <div className="presenca-sessoes-container">
                  <p>Presença em sessões</p>
                  <RadialChart
                  handleChartClick={() => this.handleChartClick()}
                  centerInfo={this.state.historico.presencaPorcentagem + '%'}
                  data={this.state.historico.charts.sessoes}
                  total={this.state.historico.totalDeSessoes} />
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

export default DetailsSenadores;