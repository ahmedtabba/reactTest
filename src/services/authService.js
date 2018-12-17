import http from "./httpService";
import { loginUrl } from "../config.json";
import { apiUrl } from "../config.json";

const authEndpoint = loginUrl + "token";
const apiEndpoint = apiUrl + "/Account/Users/";
const tokenKey = "token";
const fullNameKey = "FullName";
const userId = "UserId";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(
    authEndpoint,
    "username=" + email + "&password=" + password + "&grant_type=password"
  );

  localStorage.setItem(tokenKey, jwt.access_token);
  localStorage.setItem(fullNameKey, jwt.FullName);
  localStorage.setItem(userId, jwt.UserId);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
  try {
    const id = localStorage.getItem(userId);

    if (id === null) return null;

    const result = await http.get(apiEndpoint + id);

    const user = result.data;

    return user;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
