const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require("./reducers/index");
const { logIn, logOut } = require("./actions/user");
const { addPost } = require("./actions/post");
const { composeWithDevTools } = require("redux-devtools-extension");

const initialState = {
  user: {
    isLoggingIn: false,
    data: null
  },
  posts: []
};

const firstMiddleware = store => next => action => {
  console.log("로깅 미들웨어", action);
  next(action);

  console.log("액션 끝!!!");
};

const thunkMiddleware = store => next => action => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(reducer, initialState, enhancer);

module.exports = store;
