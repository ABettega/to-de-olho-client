import React, { Component } from "react";
import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
        userphoto: "",
        username: "",
        politicos:[1,2,3]
    };
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
       {this.state.politicos.map(politico =>{
          return (
          <div key={Math.random()} className="card-politician-horizontal"style={{backgroundImage: "url('')"}}>
              <div className="photo-politician" style={{backgroundImage: 'url("https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg")' }}> </div>
              <div className="politician-information"> 
                  <p>Nome do Cara</p>
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
