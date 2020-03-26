const { createStore, compose, applyMiddleware } = require("redux");
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

const firstMiddleware = store => next => action => {
  // 3단 고차함수 // next: dispatch랑 같다 // 이런 방식을 커링 방식이라 한다.
  console.log(
    "로깅 미들웨어",
    action
  ); /* 그냥 dispatch(action)만 쓰여져 있으면, 기본동작을 하는 것이다
  3) 그런데 console.log를 넣어줬으니, 기본동작에 뭔가를 실행하는 것이다. 
  */
  // dispatch 하기전에 추가기능은 여기에 넣기
  next(action);
  // dispatch 한 후에 추가기능은 여기에 넣기
  console.log("액션 끝!!!");
};

const thunkMiddleware = store => next => action => {
  // 객체를 (store, dispatch, action) 이렇게 3개 받아도 되지만, 이 같은 모습은 함수형 프로그램의 모습이다.
  if (typeof action === "function") {
    /* action은 본래 객체이지만, redux랑 하나의 약속을 하는 것이다.. // 비동기
    함수인경우~, 즉 비동기인 경우는 action을 함수로 넣어주겠다. 라고 말하는 것이다.
    객체로 처리할 수도 있지만, thunk는 함수로 처리한다. 
    */
    return action(store.dispatch, store.getState);
  }
  return next(action); // 여기서 return은 있어도 되고 없어도 된다.  // 동기
};

/* function firstMiddleware(store) {
  여기에 뭔가를 넣을 수있다.
  return function(next) {
    여기에 뭔가를 넣을 수있다.
    return function(action) {

    }
  } 이거랑 같은 함수 이다. // 사이사이에 뭔가를 넣을 수 있기에 3단함수로 써놓음. 들어갈것이 없으면 위처럼
  한방에 쓸 수도 있다. 
} */

const enhancer = compose(
  // compose는 굳이 안써도 되는데 이런게 있다는 것 정도는 알아 놓자
  /* compose : 합성하는 함수 */
  applyMiddleware(firstMiddleware, thunkMiddleware)
  /* devtool,<--chrome에서 쉽게 볼수 있게 해주는 도구를 붙이기 위해서는 compose를 쓴다  
  4) 위의 3)에서 console.log를 넣어줬으니, 즉 부가 기능을 넣었으니 firstMiddleware를 쓴다고 적어줘야 한다. 
  */
);

const store = createStore(reducer, initialState, enhancer);
// enhancer 덧 붙이다. 증가시키다. 즉 기존 redux가 못했던 일을 하기에 enhancer라고 한다.

store.subscribe(() => {
  console.log("subscribe 작동");
});

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
