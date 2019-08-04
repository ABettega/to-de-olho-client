import React, { Component } from "react";
import Input from "../Input";
import AuthService from "../Auth/auth-services";
import Button from "../Button";
import Select from "../Select";
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
      year: ""
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
    console.log(this.state.year);
    console.log(firstName, lastName, password, email, gender, day, month, year);
    this.service
      .signup(firstName, lastName, password, email, gender, day, month, year)
      .then(response => {
        this.setState({
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          gender: "",
          day: "",
          month: "",
          year: ""
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
            options={[
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31
            ]}
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
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default Form;
