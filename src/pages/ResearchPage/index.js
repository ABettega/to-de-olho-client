import React, { Component, Fragment } from "react";
import AuthService from "../../components/Auth/auth-services";
import CardPolitico from "../../components/CardPolitico/CardPolitico";


class ResearchPage extends Component {
  constructor(props) {
    super(props);

    this.state={
        search:"",
        deputados:[],
    }
    this.service = new AuthService();
  }

  componentDidMount(){
    this.service.deputados()
    .then(response => {
      this.setState({
      deputados: [...response]
    } )})
    .catch(err => console.log(err))
  }


  handleChange(event) {
    const { value } = event.target;
    this.setState({ search: value });
  }

  render() {
    return (
      <>
        <input name="name" type="text" value={this.state.search} placeholder="Pesquise seu político" onChange={(e)=>this.handleChange(e)} />
        <div>
            {this.state.deputados.filter(deputado => deputado.nomeDeputado.toUpperCase().includes(this.state.search.toUpperCase())).map(deputado => {
              return <CardPolitico key={deputado._id}>{deputado.nomeDeputado}</CardPolitico>
            })}
          </div>
      </>
    );
  }
}

export default ResearchPage;
