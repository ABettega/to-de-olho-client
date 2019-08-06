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

  componentDidMount() {
    axios.get(`http://localhost:5000/deputados/sessoes/${this.props.match.params.id}`)
    .then(politician => {
      const {legislaturas, sessoes, votos} = politician.data;
      this.setState({
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
    const {politicianName, uf, backImage} = this.props.location.state;
    return (
      <Fragment>
        {this.state.legislaturas ? 
        <div>
          <div className="politician-info-container">
            <img src={backImage} alt={`Foto do deputado ${politicianName}`}/>
            <div className="politician-info">
              <p>Nome: {politicianName}</p>
              <p>Partido: {uf}</p>
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
          <p>Presente em {this.state.sessoes.percentualPresenca} das sessões.</p>
          <p>Votou em {this.state.votos.percentualSobrePresenca} das sessões que compareceu.</p>
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
  