import axios from "axios";

const API_KEY = "AIzaSyAOdhrAQ4RF5WrUZDaSDm8Wqj8cFpTISXg";
const urlDataBase = "https://vente-9a8f2-default-rtdb.firebaseio.com/";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const reponse = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return reponse.data;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function resetPasswordUser(email) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
  const reponse = await axios.post(url, {
    requestType: "PASSWORD_RESET",
    email: email,
  });
  return reponse.data;
}
