import React, { Component } from "react";
import AuthService from "../../components/Auth/auth-services";


class DetailsDeputados extends Component {
  constructor(props) {
    super(props);

    this.state={

    }
    this.service = new AuthService();

  }

  render() {
    return (
      <div>
        <div>
          <p>Nome: </p>
          <p>Partido: </p>
        </div>
        <ul>
          {}
          <li />
        </ul>
        <p>Presença:</p>
        <p>Votos: </p>
      </div>
    );
  }
}

export default DetailsDeputados;
