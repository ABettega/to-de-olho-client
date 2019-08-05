import React, { Component } from "react";
import Input from "../../components/Input";
import AuthService from "../../components/Auth/auth-services";
import "./login.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
    this.service = new AuthService();
    this.handleFormSubimt = this.handleFormSubimt.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubimt(event) {
    event.preventDefault();
    const {
      password,
      email,
    } = this.state;

    this.service.login( email, password)
      .then(response => {
        if(response){
          this.setState({
            userExists:true
          })
        }
        this.setState({
          password: "",
          email: "",
        });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={e => this.handleFormSubimt(e)} className="form">
        <h1>Login</h1>
        <Input
          type="text"
          name="email"
          placeholder="Endereço de E-mail"
          change={e => this.handleChange(e)}
          value={this.state.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          change={e => this.handleChange(e)}
          value={this.state.password}
        />
        <button className="button-a ligth-green" type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
