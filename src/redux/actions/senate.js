import axios from "axios";

const FETCH_REQUEST = "senateCurrent/FETCH_REQUEST";
const FETCH_SUCCESS = "senateCurrent/FETCH_SUCCESS";
const FETCH_FAILURE = "senateCurrent/FETCH_FAILURE";

export const actions = {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
};

function fetchRequest() {
  return { type: FETCH_REQUEST };
}

function fetchSuccess(response) {
  return {
    type: FETCH_SUCCESS,
    response
  };
}

function fetchFailure(error) {
  return {
    type: FETCH_FAILURE,
    error
  };
}

// thunk

export function fetchCurrentSenate() {
  return async dispatch => {
    dispatch(fetchRequest());
    try {
      const response = await axios.get(
        "http://legis.senado.leg.br/dadosabertos/senador/lista/atual"
      );
      const data =
        response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
      dispatch(fetchSuccess(data));
      console.log(data);
    } catch (error) {
      dispatch(fetchFailure(error));
    }
  };
}
