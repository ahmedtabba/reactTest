import {
  GET_COUNTRIES,
  POST_COUNTRY,
  DELETE_COUNTRY,
  UPDATE_COUNTRY
} from "./types";
import {
  getCountries,
  saveCountry,
  deleteCountry
} from "../services/countryServies";
import { toast } from "react-toastify";

export function getCountriesAction() {
  return async function(dispatch) {
    const { data: countries } = await getCountries();
    dispatch({
      type: GET_COUNTRIES,
      payload: countries
    });
  };
}

export function createCountry(country) {
  return async function(dispatch) {
    const newCountry = await saveCountry(country);
    dispatch({
      type: POST_COUNTRY,
      payload: newCountry.data
    });
  };
}

export function updateCountry(country) {
  return async function(dispatch) {
    const newCountry = await saveCountry(country);
    dispatch({
      type: UPDATE_COUNTRY,
      payload: newCountry.data
    });
  };
}

export function deleteCountryAction(countryId) {
  return async function(dispatch) {
    try {
      await deleteCountry(countryId);
      dispatch({
        type: DELETE_COUNTRY,
        payload: countryId
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This country has already been deleted.");

      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data.message);
    }
  };
}
