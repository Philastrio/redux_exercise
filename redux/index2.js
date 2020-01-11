const { createStore } = require("redux");

const reducer = (prevState, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        ...prevState, //얕은 복사
        user: action.data
      };
    }
    case "LOG_OUT": {
      return {
        ...prevState, //얕은 복사
        user: null
      };
    }
    case "ADD_POST": {
      return {
        ...prevState, //얕은 복사
        posts: [...prevState.posts, action.data]
      };
    }
    default: {
      // 오타나는 경우 대비
      return prevState;
    }
  }
};
const initialState = {
  user: null,
  posts: []
};

/* const nextState = {
  ...initialState,
  posts: [action.data]
}

const nextState = {
  ...initialState,
  posts: [...initialState.posts, action.data]
} 
이런식으로 데이터를 불변성을 유지하면서 바꿔나간다
*/

const store = createStore(reducer, initialState);

/* store.subsribe(() => {
  // 화면 바꿔준다 but react-redux안에 들어있다. 그래서 자동으로 화면을 바꿔준다
  // 그래서 실제로 react에서 subscribe할일은 거의 없다. 에러 디버깅 할때만 주로 쓰인다.
  console.log("changed"); // 화면 바꿔주는 코드 여기서
}); */

console.log("1st", store.getState());
//action
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
const addPost = data => {
  return {
    type: "ADD_POST",
    data
  };
};

//-------------------------------------------------
/* 이 위는 미리 만들어 놓는 것이고*/
//-------------------------------------------------
/* 이 아래는 리액트에서 실행하는 것이다.  */
store.dispatch(
  logIn({
    id: 1,
    name: "han",
    admin: true
  })
);
console.log("2번째", store.getState());

store.dispatch(
  addPost({
    userId: 1,
    id: 1,
    content: "안녕하세요 한강입니다"
  })
);
console.log("3번째", store.getState());

store.dispatch(
  addPost({
    userId: 1,
    id: 2,
    content: "안녕하세요 한강2입니다"
  })
);
console.log("4번째", store.getState());

store.dispatch(logOut());
console.log("5번째", store.getState());
