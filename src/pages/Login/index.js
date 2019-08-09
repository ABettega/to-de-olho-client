import React, { Component } from "react";
import Input from "../../components/Input";
import AuthService from "../../components/Auth/auth-services";
import { Link } from "react-router-dom";
import "./login.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", email: "" };
    this.service = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { password, email } = this.state;

    if (this.validaEmail(email)) {
      if (password !== "" && email !== "") {
        this.service
          .login(email, password)
          .then(response => {
            if (response.error === true) {
              this.setState({
                error: true,
                errorMessage: "Usuário ou senha incorretos!"
              });
            } else {
              this.props.getUser(response);
              this.props.history.push({
                pathname: "/pesquisar",
                state: { loginMessage: "Obrigado por fazer o login!" }
              });
            }
          })
          .catch(e => console.log("e"));
      } else {
        this.setState({
          error: true,
          errorMessage: "Todos os dados precisam ser preenchidos!"
        });
      }
    } else {
      this.setState({
        error: true,
        errorMessage: "O email digitado é inválido!"
      });
    }
  }

  validaEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    let erro = "";
    if (this.state.error === true) {
      erro = this.state.errorMessage;
    }
    return (
      <div className="div-login">
        <form onSubmit={e => this.handleFormSubmit(e)} className="form">
          <h1>Login</h1>
          <Input
            required="true"
            type="text"
            name="email"
            placeholder="Endereço de E-mail"
            change={e => this.handleChange(e)}
            value={this.state.email}
          />
          <Input
            required="true"
            type="password"
            name="password"
            placeholder="Senha"
            change={e => this.handleChange(e)}
            value={this.state.password}
          />
          <button className="button-a ligth-green" type="submit">
            Login
          </button>
          <label className="mensagem-erro">{erro}</label>
          <hr className="hr-signup"></hr>
         <p className="already-account">Ainda não tem uma conta? <Link to="/registrar">Cadastre-se</Link></p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
