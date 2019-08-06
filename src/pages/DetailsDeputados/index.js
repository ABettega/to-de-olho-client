import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import './detailsdeputados.css';
import axios from 'axios';
import LoadingIcon from "../../components/LoadingIcon";

class DetailsDeputados extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    }    
    this.service = new AuthService();
    
  }

  toCapitalized = (str) => {
    return str.toLowerCase().split(' ').map(a => a[0].toUpperCase() + a.slice(1)).join(' ');
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/deputados/sessoes/${this.props.match.params.id}`)
    .then(politician => {
      const {legislaturas, sessoes, votos, nomeDeputado, partido, uf, foto} = politician.data;
      this.setState({
        politicianName: this.toCapitalized(nomeDeputado),
        partido: partido,
        uf: uf,
        foto: foto,
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
          total: votos.total,
          percentualSobrePresenca: votos.percentualSobrePresenca,
        }
      })
    })
    .catch(e => console.log(e));
  }
  
  render() {
    return (
      <Fragment>
        {this.state.legislaturas ? 
        <div>
          <div className="politician-info-container">
            <img src={this.state.foto} alt={`Foto do deputado ${this.state.politicianName}`}/>
            <div className="politician-info">
              <p>Nome: {this.state.politicianName}</p>
              <p>Partido: {this.state.partido}</p>
              <p>UF: {this.state.uf}</p>
              <ul> Legislaturas: 
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
              </ul>
            </div>
          </div>
          <p>Presente em {this.state.sessoes.percentualPresenca} ({this.state.sessoes.presente}/{this.state.sessoes.total}) das sessões.</p>
          <p>Votou em {this.state.votos.percentualSobrePresenca} ({this.state.votos.total}/{this.state.sessoes.presente}) das sessões que compareceu.</p>
          <p>Obstruiu a votação {this.state.votos.obstrucao} vezes</p>
          <p><span>(Obstruções contam como 'presença' na votação)</span></p>
        </div>
        :
        <div className="loading-icon-container">
          <LoadingIcon />
          <p>Carregando</p>
        </div>
        }
      </Fragment>
      );
    }
  }
  
  export default DetailsDeputados;
  