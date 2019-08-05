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
      userExists:false
    };
    this.service = new AuthService();
    this.handleFormSubimt = this.handleFormSubimt.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubimt(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      password,
      email,
      gender,
      day,
      month,
      year
    } = this.state;
    console.log(firstName,lastName,password,email,gender,day,month,year)

    this.service.signup(firstName, lastName, password, email, gender, day, month, year)
      .then(response => {
        if(response){
          this.setState({
            userExists:true
          })
        }
        this.setState({
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          gender: "",
          day: "",
          month: "",
          year: "",
          userExists:false
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
        <h1>Sign Up</h1>
        <Input
          type="text"
          name="email"
          placeholder="Endereço de E-mail"
          change={e => this.handleChange(e)}
          value={this.state.email}
        />
        <Input
          type="text"
          name="firstName"
          placeholder="Nome"
          change={e => this.handleChange(e)}
          value={this.state.firstName}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          change={e => this.handleChange(e)}
          value={this.state.lastName}
        />
        <Select
          name="gender"
          placeholder="Gênero"
          options={["Feminino", "Masculino", "Outro", "Prefiro não declarar"]}
          change={e => this.handleChange(e)}
          value={this.state.gender}
        />
        <div>
          <Select
            name="day"
            placeholder="Dia"
            options={[1,2,31]}
            change={e => this.handleChange(e)}
            value={this.state.day}
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
          />
          <Select
            name="year"
            placeholder="Ano"
            options={[2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995]}
            change={e => this.handleChange(e)}
            value={this.state.year}
          />
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          change={e => this.handleChange(e)}
          value={this.state.password}
        />
        <button className="button-a ligth-green" type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
