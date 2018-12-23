import {
  GET_COUNTRIES,
  POST_COUNTRY,
  DELETE_COUNTRY,
  UPDATE_COUNTRY
} from "../actions/types";

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  let countries;
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        items: action.payload
      };
    case POST_COUNTRY:
      countries = [...state.items];
      countries.push(action.payload);
      return {
        ...state,
        items: countries
      };

    case DELETE_COUNTRY:
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      };
    case UPDATE_COUNTRY:
      countries = [...state.items];

      const country = countries.find(c => c.id === action.payload.id);

      const index = countries.indexOf(country);

      countries[index] = { ...action.payload };

      return {
        ...state,
        items: countries
      };
    default:
      return state;
  }
}
