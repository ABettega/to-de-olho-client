import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import AuthService from "../../components/Auth/auth-services";
// import { url } from "inspector";

const AddPoli = styled.input`
  appearance: none;
  position: absolute;
  width: 35px;
  height: 60px;
  top: 0;
  right: 0;
  padding-right: 5px;
  background-image: url("/images/favorite-unchecked.png");
  background-size: 35px 60px;
  background-repeat: no-repeat;
  opacity: 0.9;

  :checked {
    background-image: url("/images/favorite-checked.png");
  }

  :hover {
    animation: pulse_favorite 1s ease;
  }
`;

const PulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
`;

const PulseFavorite = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Card = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Container = styled.div`
  width: 40%;
  height: 400px;
  margin: 0 8px;
  box-shadow: 0px 0px 20px 1px rgba(189, 189, 189, 0.47);
  flex-shrink: 0;
  position: relative;

  :hover {
    animation: ${PulseAnimation} 1s ease;
  }

  @media (min-width: 576px) {
    margin-bottom: 50px;
    width: 255px;
  }
`;

const CardSlider = styled(Link)`
  width: 100%;
  text-decoration: none;
  text-align: center;
  color: black;
`;

const Size100 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: static;
`;

const Party = styled.div`
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  /* border: 3px solid #DDD; */
  box-shadow: 2px 2px 12px #aaa;
  background-color: white;
  position: relative;
  top: -36px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 576px) {
    width: 100px;
    height: 100px;
  }
`;

const PartyImg = styled.img`
  width: 70%;
  height: auto;
`;

class CardPolitico extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      politician: "",
      user: this.props.user
    };

    this.service = new AuthService();
    this.handleChecked = this.handleChecked.bind(this);
    this.handlePolitician = this.handlePolitician.bind(this);
  }

  componentDidMount() {
    let isChecked = false;
    if (this.props.fav && this.props.fav.includes(String(this.props.id))) {
      isChecked = true;
    }
    this.setState({
      politician: this.props.politician,
      isChecked: isChecked
    });
  }

  handleChecked() {
    this.setState(
      {
        isChecked: !this.state.isChecked
      },
      this.handlePolitician
    );
  }

  handlePolitician() {
    if (this.state.isChecked) {
      this.service
        .addpolitician(this.props.id, this.props.politician)
        .then(response => response)
        .catch(err => console.log(err));
    } else {
      this.service
        .deletepolitician(this.props.id, this.props.politician)
        .then(response => response)
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <Fragment>
        <Container>
          <CardSlider to={this.props.politician + this.props.id}>
            <Size100>
              <Card
                style={{ backgroundImage: `url(${this.props.backImage})` }}
              />
              <Party>
                <PartyImg
                  className="partido-img"
                  src={`/images/partidos/${this.props.siglaPartido}.png`}
                />
              </Party>
              <div className="names">
                <div className="polit-name-text">
                  <p>{this.props.politicianName}</p>
                  <p>{this.props.uf}</p>
                </div>
              </div>
            </Size100>
          </CardSlider>
          {this.state.user && (
            <AddPoli
              className="add-poli"
              checked={this.state.isChecked}
              onChange={this.handleChecked}
              type="checkbox"
            ></AddPoli>
          )}
        </Container>
      </Fragment>
    );
  }
}

export default CardPolitico;
