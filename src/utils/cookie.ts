import Cookies from "js-cookie";

export const SET_MENU = (menu: any) => {
  Cookies.set("menu", menu);
};

export const GET_MENU = () => {
  return JSON.parse(Cookies.get("menu") as string);
};

export const SET_TOKEN = (token: any) => [Cookies.set("token", token)];

export const GET_TOKEN = () => {
  return Cookies.get("token");
};
