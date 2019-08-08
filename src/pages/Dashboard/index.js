import React, { Component } from "react";
import AuthService from "../../components/Auth/auth-services";
import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
        username: "",
        depFavoritos:[],
        senFavoritos:[],
        deputadostodos:[],
        senadorestodos:[]
    };
    this.service = new AuthService();
  }
  
  componentDidMount(){
    this.service.loggedin()
    .then(response =>{
      let {firstName,depFavoritos, senFavoritos} = response
      console.log(response)
      this.setState({
        username: firstName,
        depFavoritos: depFavoritos,
        senFavoritos: senFavoritos
      })
    })
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

  render() {
    return (
    <div id="dashboard">
      <div>
        <div id="user">
          <p>Gabriela Dias de Souza</p>
          <a href="#">Editar</a>
        </div>
      </div>
      <div>
        {console.log(this.state.senFavoritos)}
      {this.state.senadorestodos
                .filter(senador => {
                  return this.state.senFavoritos.includes(String(senador.IdentificacaoParlamentar.CodigoParlamentar))})
                .map(senador =>{
                  console.log(senador)
          return (
          <div key={Math.random()} className="card-politician-horizontal"style={{backgroundImage: "url('')"}}>
              <div className="photo-politician" style={{backgroundImage: 'url("https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg")' }}> </div>
              <div className="politician-information"> 
                  <p>{senador.IdentificacaoParlamentar.NomeParlamentar}</p>
                  <input className="add-politician" type="checkbox"></input>
              </div>
          </div>)
      })}

      </div>
     </div>
    );
  }
}

export default Dashboard;
