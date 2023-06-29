import { getBaseUrl } from "./apiUtils";
import { getRequestOptions } from "./apiUtils";

export const getAuthToken = () => {
  if (localStorage.getItem("authToken")) {
    return "jwt " + localStorage.getItem("authToken");
  }
  return null;
};

const getAuthHeaderValue = (authType = "jwt", username, password) => {
  if (authType === "jwt") {
    return getAuthToken();
  }
  return (
    "Basic " +
    window.btoa(unescape(encodeURIComponent(username + ":" + password)))
  );
};

export const performBasicLogin = async (username, password) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    getAuthHeaderValue("Basic", username, password)
  );
  let headers = null;
  try {
    const response = await fetch(
      getBaseUrl() + "/auth/login",
      getRequestOptions(myHeaders)
    );
    headers = [...response.headers.entries()].filter((res) =>
      res.includes("authorization")
    )[0][1];
    const userInfo = await response.json();
    return {
      headers,
      userName: userInfo.userName,
      authorities: userInfo.authorities,
    };
  } catch (error) {
    return console.log("error", error);
  }
};

export const performJWTLogin = async (username, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", getAuthHeaderValue());
  let headers = null;
  try {
    const response = await fetch(
      getBaseUrl() + "/auth/login",
      getRequestOptions(myHeaders)
    );
    if (response.status === 401) {
      return null;
    }
    headers = [...response.headers.entries()].filter((res) =>
      res.includes("authorization")
    )[0][1];
    const userInfo = await response.json();
    return {
      headers,
      userName: userInfo.userName,
      authorities: userInfo.authorities,
    };
  } catch (error) {
    return console.log("error", error);
  }
};
