const { combineReducers } = require("redux");
const UserReducer = require("./user");
const PostReducer = require("./post");

module.exports = combineReducers({
  user: UserReducer /* 
  mainIndex의 initialState의  
   user: {
    isLoggingIn: true,
    data: null
  },
  posts: [],

  이걸 따라간다. 
  */,
  posts: PostReducer
});
