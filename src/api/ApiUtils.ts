import { navigate } from "raviger";

const baseURL = "https://money-manager-pranshu1902.herokuapp.com/";

// const baseURL = "http://127.0.0.1:8000/";

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// main request function
const request: any = async (
  method: methods = "GET",
  data: any = {},
  endpoint: string
) => {
  let url;
  let payload: string;

  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${baseURL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${baseURL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Basic Authentication
  // const auth = "Basic " + window.btoa("test:corona1902");

  // Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: auth },
      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    return error;
  }
};

export const login = async (username: string, password: string) => {
  const data = { username: username, password: password };
  return request("POST", data, "api-token-auth/");
};

export const signup = async (
  username: string,
  password: string,
  confirmPassword: string
) => {
  const data = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  };
  return request("POST", data, "user/");
};

export const me = async () => {
  return request("GET", {}, "api/user");
};

export const logout = async () => {
  localStorage.removeItem("token");
  navigate("/");
  window.location.reload();
  // return request("auth/logout/", "POST");
};

export const getTransactions = async () => {
  return request("GET", {}, "transactions/");
};

export const postTransaction = async (
  amount: Number,
  description: string,
  spent: boolean = true
) => {
  const data = { amount: amount, description: description, spent: spent };
  return request("POST", data, "transactions/");
};

export const updateUser = async (username: string, password: string) => {
  const data = { username: username, password: password };
  return request("PUT", data, "user/");
};
