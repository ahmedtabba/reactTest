import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/Account/Register";

export function register(user) {
  console.log(user);

  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    fullname: user.fullname,
    branchId: user.branchId,
    roleName: user.roleName
  });
}
