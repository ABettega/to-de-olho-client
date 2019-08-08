import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../components/Auth/auth-services";
import './cardPolitico.css'

class CardPolitico extends Component {
  constructor(props){
    super(props)

    this.state = {
      isChecked: false,
      politician: "",
      user: this.props.user
    }

    this.service = new AuthService();
    this.handleChecked = this.handleChecked.bind(this)
    this.handlePolitician = this.handlePolitician.bind(this)
  }

  componentDidMount(){
    let isChecked = false;
    if ((this.props.fav) && this.props.fav.includes(String(this.props.id))) {
      isChecked = true;
    }
    this.setState({
      politician: this.props.politician,
      isChecked: isChecked
    })
  }

  handleChecked(){
    this.setState({
      isChecked: !this.state.isChecked
    }, this.handlePolitician)
  }

  handlePolitician(){
    if(this.state.isChecked){
      this.service.addpolitician(this.props.id,this.props.politician)
      .then(response => response)
      .catch(err => console.log(err))
    } else{
      this.service.deletepolitician(this.props.id,this.props.politician)
      .then(response => response)
      .catch(err => console.log(err))
    }
  }

  render(){
    return (
      <Fragment>
        <div className="div-maior">
        <Link className="card-slider" to={this.props.politician + this.props.id}>
          <div className="size-100">
          <div style={{backgroundImage: `url(${this.props.backImage})`}} className="card"/>
          <div className="partido"></div>
          <div className="names">
            <p>{this.props.politicianName}</p>
            <p>{this.props.uf}</p>
          </div>
        </div></Link>
        {(this.state.user) && <input className="add-poli" checked={this.state.isChecked} onChange={this.handleChecked} type="checkbox"></input>}
        </div>
      </Fragment>
    );
  }
};

export default CardPolitico;
