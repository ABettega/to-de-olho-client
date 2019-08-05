import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";


class ResearchPage extends Component {
  constructor(props) {
    super(props);

    this.state={
        name:"",
        deputados:"",
    }
    this.service = new AuthService();
  }

  componentDidMount(){
    this.service.deputados()
    .then(response => {
      this.setState({
      deputados: [response.data]
    } )})
    .catch(err => console.log(err))
  }


  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <input name="name" type="text" value={this.state.name} placeholder="Pesquise seu político" onChange={(e)=>this.handleChange(e)} />
        {this.state.deputados}
      </>
    );
  }
}

export default ResearchPage;
