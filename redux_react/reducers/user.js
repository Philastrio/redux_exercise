const { produce } = require("immer"); // import랑 con

const initialState = {
  isLoggingIn: false,
  data: null
};

/* nextState = produce(prevState, (draft) => {// immer 기본 형태이다. /이전 스테이트를 받아서 (draft) => {} 액션을 처리한다.

}) */

const UserReducer = (prevState = initialState, action) => {
  return produce(prevState, draft => {
    // draft는 prevState 복사본이다

    switch (action.type) {
      case "LOG_IN_REQUEST":
        draft.data = null;
        draft.isLoggingIn = true;
        break;

      /* return {
          ...prevState, //얕은 복사
          isLoggingIn: true,
          data: null
        }; */

      case "LOG_IN_SUCCESS":
        draft.data = action.data;
        draft.isLoggingIn = false;
        break;

      /* return {
          ...prevState, //얕은 복사
          isLoggingIn: false,
          data: action.data
        }; */

      case "LOG_IN_FAILURE":
        draft.isLoggingIn = false;
        draft.data = null;
        break;

      case "LOG_OUT":
        draft.data = null;

      default: {
        // 오타나는 경우 대비
        break;
      }
    }
  });
};

module.exports = UserReducer;
