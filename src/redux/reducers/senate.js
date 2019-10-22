import { actions } from "../actions/senate";

const initialState = {
  isFetching: false,
  error: "",
  data: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ""
      };
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: [...state.data, ...action.response]
      };
    case actions.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
export default reducer;
