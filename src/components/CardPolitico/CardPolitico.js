import React, {Component} from "react";
import { Link } from "react-router-dom";
import AuthService from "../../components/Auth/auth-services";
import './cardPolitico.css'

class CardPolitico extends Component {
  constructor(props){
    super(props)

    this.state={
      isChecked:false,
      politician:""
    }
    this.service = new AuthService();
    this.handleChecked = this.handleChecked.bind(this)
    this.handlePolitician = this.handlePolitician.bind(this)
  }

  componentDidMount(){
    this.setState({
      politician: this.props.politician
    })
  }

  handleChecked(){
    this.setState({
      isChecked:!this.state.isChecked
    }, this.handlePolitician)
  }

  handlePolitician(){
    if(this.state.isChecked){
      console.log(this.props.id,this.props.politician)
      this.service.addpolitician(this.props.id,this.props.politician)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    } else{
      this.service.deletepolitician(this.props.id,this.props.politician)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    }
  }


  render(){
    return (
      <>
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
      <input className="add-poli" onChange={this.handleChecked} type="checkbox"></input>
      </div>
      </>
    );
  }
};

export default CardPolitico;
