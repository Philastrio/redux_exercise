const logIn = data => {
  return {
    type: "LOG_IN",
    data
  };
};
const logOut = data => {
  return {
    type: "LOG_OUT"
  };
};

module.exports = {
  logIn,
  logOut
};
