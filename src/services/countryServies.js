import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/countries";

function countryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCountries() {
  return http.get(apiEndpoint);
}

export function getCountry(countryId) {
  return http.get(countryUrl(countryId));
}

export function saveCountry(country) {
  if (country.id) {
    const body = { ...country };
    return http.put(countryUrl(country.id), body);
  }

  return http.post(apiEndpoint, country);
}

export function deleteCountry(countryId) {
  return http.delete(countryUrl(countryId));
}
