import React, { Component } from "react";
import Input from "../../components/Input";
import AuthService from "../../components/Auth/auth-services";
import Button from "../../components/AButton";
import Select from "../../components/Select";
import "./form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      gender: "",
      day: "",
      month: "",
      year: "",
      error: false,
      errorMessage: '',
    };
    this.service = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validaEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  handleFormSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      password,
      email,
      gender,
      day,
      month,
      year,
    } = this.state;

    if (this.validaEmail(email)) {
      if ((firstName !== '' && lastName !== '' && password !== '' 
      && email !== '' && gender !== '' && day !== '' && month !== '' && year !== '')) {
        this.service.signup(firstName, lastName, password, email, gender, day, month, year)
          .then(response => {
            if (response.error === true) {
              this.setState({
                error: true,
                errorMessage: 'Este usuário já existe no banco de dados!'
              });
            } else {
              this.setState({
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                gender: "",
                day: "",
                month: "",
                year: "",
                error: false,
                errorMessage: ''
              });
              this.props.getUser(response);
              this.props.history.push({
                pathname: '/pesquisar',
                state: {loginMessage: 'Obrigado por fazer o registro!'}
              });
            }
          })
          .catch(e => console.log(e));
      } else {
        this.setState({
          error: true,
          errorMessage: 'Todos os dados precisam ser preenchidos!',
        });
      }        
    } else {
      this.setState({
        error: true,
        errorMessage: 'O email digitado é inválido!',
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    switch(name){
      case 'email':
        if (name.includes("@") && name.includes("."))
          break;
      default:
    }
  }

  render() {
    let erro = '';
    if (this.state.error === true) {
      erro = this.state.errorMessage;
    }
    return (
      <form onSubmit={e => this.handleFormSubmit(e)} className="form">
        <h1>Sign Up</h1>
        <Input
          type="text"
          name="email"
          placeholder="Endereço de E-mail"
          change={e => this.handleChange(e)}
          value={this.state.email}
          required='true'
        />
        <Input
          type="text"
          name="firstName"
          placeholder="Nome"
          change={e => this.handleChange(e)}
          value={this.state.firstName}
          required='true'
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          change={e => this.handleChange(e)}
          value={this.state.lastName}
          required='true'
        />
        <Select
          name="gender"
          placeholder='Gênero'
          options={["Feminino", "Masculino", "Outro", "Prefiro não declarar"]}
          change={e => this.handleChange(e)}
          value={this.state.gender}
          required='true'
        />
        <div>
          <Select
            name="day"
            placeholder="Dia"
            options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}
            change={e => this.handleChange(e)}
            value={this.state.day}
            required='true'
            />
          <Select
            name="month"
            placeholder="Mês"
            options={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro"
            ]}
            change={e => this.handleChange(e)}
            value={this.state.month}
            required='true'
            />
          <Select
            name="year"
            placeholder="Ano"
            options={[2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995]}
            change={e => this.handleChange(e)}
            value={this.state.year}
            required='true'
            />
        </div>
        <Input
          required='true'
          type="password"
          name="password"
          placeholder="Senha"
          change={e => this.handleChange(e)}
          value={this.state.password}
        />
        <button className="button-a ligth-green" type="submit">Submit</button>
        <label className='mensagem-erro'>{erro}</label>
      </form>
    );
  }
}

export default Form;
