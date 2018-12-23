import { AUTH_USER } from "./types";
import { getCurrentUser } from "../services/authService";

export function authUserAction() {
  return async function(dispatch) {
    const user = await getCurrentUser();
    dispatch({
      type: AUTH_USER,
      payload: user
    });
  };
}
