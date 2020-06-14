export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.user.token) {
    return { Authorization: "Token " + user.user.token };
  } else {
    return {};
  }
}
