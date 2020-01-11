const { createStore } = require("redux");
const reducer = require("./reducers/index");
const { logIn, logOut } = require("./actions/user");
const { addPost } = require("./actions/post");

const initialState = {
  // redux에서는 이 구조를 짜는 것이 매우 중요하다. 이것에 의해서 리덕스 구조가 달라지기 때문이다.
  user: {
    isLoggingIn: true,
    data: null
  },
  posts: [],
  comments: [], // post와 관계가 있지만, 덩치가 커질만한 것들은 밖으로 빼는 것이 좋다
  /* 이런 것을 normalize라고 한다. post안에두면 post가 커질대마다 comment배열이 생기는데
  나중에 comments만 접속하고 싶을때 post를 통해서만 들어가야 하기 때문에 불편하다
  다만 normalize의 단점은 메모리를 많이 먹는다는 것이다. 그래서 infinite scroll를 할때
  메모리 관리를 해줘야 한다. 
  */
  favorites: [],
  history: [],
  likes: [],
  followers: []
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
