import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import './detailsdeputados.css';
import axios from 'axios';
import LoadingIcon from "../../components/LoadingIcon";
import { RadialChart, LabelSeries } from 'react-vis';
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
            charts: [
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
      const { legislaturas, sessoes, votos } = politicianHist.data;
      this.setState({
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
    const atual = this.state.atual;
    console.log()
    return (
      <Fragment>
        { this.state.showVotes && <MessageAttach handleChartClick={() => this.handleChartClick()} title="Oi"/>}
      {this.state.atual ?
        <div>
        <div className="politician-info-container">
        <img src={this.state.foto} alt={`Foto do deputado ${this.state.politicianName}`} />
        <div className="politician-info">
        <p>Nome: {this.state.politicianName}</p>
        <p>Partido: {this.state.partido}</p>
        <p>UF: {this.state.uf}</p>
        </div>
        </div>
        <div className="info-container">
        <div className='legis-container'>
        <p className="legis-text"><span>Legislatura:</span> {this.dateToShow(atual.legislatura.dataInicio)} - {this.dateToShow(atual.legislatura.dataFim)}</p>
        </div>
        <div className="charts-container">
        <div className="presenca-sessoes-container">
        <p>Presença em sessões</p>
        <RadialChart 
        className="radial-chart"
        innerRadius={40}
        radius={80}
        showLabels={true}
        onValueClick={(dp, e) => {
          this.handleChartClick(dp);
        }}
        data={this.state.atual.charts}
          labelsRadiusMultiplier={1.6}
          width={300}
          height={300}
          padAngle={0.04}
          center={{x: 0, y: 0}}
          >
          <LabelSeries data={[{x: 0, y: 0, yOffset: 8, xOffset: 2, label: `${atual.sessoes.percentualPresenca}`, style:{textAnchor: 'middle'}}]}></LabelSeries>
          </RadialChart>
          {/* <p>Presente em {atual.sessoes.percentualPresenca} ({atual.sessoes.presente}/{atual.sessoes.total}) das sessões.</p>
          <p>Votou em {atual.votos.percentualDeVotos} ({atual.votos.totalDeVotos}/{atual.votos.totalDeVotacoes}) das votações em que compareceu.</p>
          <p>Obstruiu a votação {atual.votos.obstrucao} vezes</p>
        <p><span>(Obstruções contam como 'presença' na votação)</span></p> */}
        </div>
        <div className="presenca-sessoes-container">
        <p>Presença em votações</p>
        <RadialChart
        className="radial-chart"
        innerRadius={40}
        radius={80}
        showLabels={true}
        data={[
          { angle: atual.votos.totalDeVotos, 
            label: '' + atual.votos.totalDeVotos, 
            subLabel:'Votos',
          },
          { angle: atual.votos.obstrucao, 
            label: '' + atual.votos.obstrucao, 
            subLabel:'Obstrução'
          },
          { angle: atual.votos.totalDeVotacoes - atual.votos.obstrucao - atual.votos.totalDeVotos, 
            label: '' + (atual.votos.totalDeVotacoes - atual.votos.obstrucao - atual.votos.totalDeVotos), 
            subLabel:'Não registrou voto',
            angleDomain: 1.5,
            style: {
              fill: 'rgba(0, 0, 0, 0)',
            }
          },
        ]}
        labelsRadiusMultiplier={1.6}
        width={300}
        height={300}
        padAngle={0.04}
        center={{x: 0, y: 0}}
        >
        <LabelSeries data={[{x: 0, y: 0, yOffset: 8, xOffset: 2, label: `${this.state.atual.votos.percentualDeVotos}`, style:{textAnchor: 'middle'}}]}></LabelSeries>
        </RadialChart>
        {/* <p className="legis-text">| {this.dateToShow(this.state.atual.legislatura.dataInicio)} - {this.dateToShow(this.state.atual.legislatura.dataFim)} |</p> */}
        {/* <p>Presente em {this.state.atual.sessoes.percentualPresenca} ({this.state.atual.sessoes.presente}/{this.state.atual.sessoes.total}) das sessões.</p>
        <p>Votou em {this.state.atual.votos.percentualDeVotos} ({this.state.atual.votos.totalDeVotos}/{this.state.atual.votos.totalDeVotacoes}) das votações em que compareceu.</p>
        <p>Obstruiu a votação {this.state.atual.votos.obstrucao} vezes</p>
      <p><span>(Obstruções contam como 'presença' na votação)</span></p> */}
      </div>
      </div>
      <hr/>
      </div>
      {this.state.historico ?
        <div>
        <p className="legis-text">Legislaturas: {this.state.historico.legislaturas.map(legis => {
          return `${this.dateToShow(legis.dataInicio)} - ${this.dateToShow(legis.dataFim)} | `;
        })}</p>
        <p>Presente em {this.state.historico.sessoes.percentualPresenca} ({this.state.historico.sessoes.presente}/{this.state.historico.sessoes.total}) das sessões.</p>
        <p>Votou em {this.state.historico.votos.percentualDeVotos} ({this.state.historico.votos.totalDeVotos}/{this.state.historico.votos.totalDeVotacoes}) das votações em que compareceu.</p>
        <p>Obstruiu a votação {this.state.historico.votos.obstrucao} vezes</p>
        <p><span>(Obstruções contam como 'presença' na votação)</span></p>
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