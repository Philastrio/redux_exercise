const initialState = [];
const UserReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        ...prevState, //얕은 복사
        data: action.data // 1) 그냥 객체로 바뀌기에 user -> data로 바꿈
      };
    }
    case "LOG_OUT": {
      return {
        ...prevState, //얕은 복사
        data: null // 1) 그냥 객체로 바뀌기에 user -> data로 바꿈
      };
    }

    default: {
      // 오타나는 경우 대비
      return prevState;
    }
  }
};

module.exports = UserReducer;
