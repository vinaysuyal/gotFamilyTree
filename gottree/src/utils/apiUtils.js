export const getBaseUrl = () => {
  return "http://localhost:8080";
};
export const getRequestOptions = (myHeaders, method = "GET") => ({
  method,
  headers: myHeaders,
  redirect: "follow",
});
