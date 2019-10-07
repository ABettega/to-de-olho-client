import React, { Component } from "react";
import Input from "../../components/Input";
import AuthService from "../../components/Auth/auth-services";
import Button from "../../components/AButton";
import Select from "../../components/Select";
import { Link } from "react-router-dom";
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

  countNumbers(num1,num2){
    let arrNumbers=[]
    if(num1<num2){
      for(let i = num1; i<=num2; i+=1){
        arrNumbers.push(i)
      }
    } else{
      for(let i = num1; i>=num2; i-=1){
        arrNumbers.push(i)
      }
    }
    return arrNumbers
  }

  render() {
    let erro = '';
    if (this.state.error === true) {
      erro = this.state.errorMessage;
    }
    return (
      <div className="div-signup">
      <form onSubmit={e => this.handleFormSubmit(e)} className="form">
        <h1>Cadastre-se</h1>
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
        <div className="birthday">
          <Select
            name="day"
            placeholder="Dia"
            options={this.countNumbers(1,31)}
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
            options={this.countNumbers(2003, 1920)}
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
        <button className="button-a light-green" type="submit">Submit</button>
        <label className='mensagem-erro'>{erro}</label>
        <hr className="hr-signup"></hr>
        <p className="already-account">Já tem uma conta? <Link to="/login">Login</Link></p>
      </form>
      </div>
    );
  }
}

export default Form;
