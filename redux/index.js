const { createStore } = require("redux");

const CHANGE_COMP_A = "CHANGE_COMP_A";
const CHANGE_COMP_B = "CHANGE_COMP_B";
const CHANGE_COMP_C = "CHANGE_COMP_C";

const reducer = (prevState, action) => {
  switch (action.type) {
    case CHANGE_COMP_A: {
      return {
        prevState, //얕은 복사
        compA: action.data
      };
    }
    case CHANGE_COMP_B: {
      return {
        prevState, //얕은 복사
        compB: action.data
      };
    }
    case CHANGE_COMP_C: {
      return {
        prevState, //얕은 복사
        compC: action.data
      };
    }
    default: {
      // 오타나는 경우 대비
      return prevState;
    }
  }
};
const initialState = {
  compA: "a",
  compB: 12,
  compC: null
};

const store = createStore(reducer, initialState);

/* store.subsribe(() => {
  // 화면 바꿔준다 but react-redux안에 들어있다. 그래서 자동으로 화면을 바꿔준다
  // 그래서 실제로 react에서 subscribe할일은 거의 없다. 에러 디버깅 할때만 주로 쓰인다.
  console.log("changed"); // 화면 바꿔주는 코드 여기서
}); */

console.log("1st", store.getState());
//action
const changeCompA = data => {
  /*  action은 추상적으로 만드는 것이 좋다(함수로 만들자)  변수를 자꾸 만들어야 하는 상황을 피해야 한다. 
  그러면 코드는 간결해진다.  */
  return {
    type: "CHANGE_COMP_A",
    data
    /* 함수가 aciton이 아니라 return 이후의 객체가 action이다. 
    함수는 액션생성자, action creator이다. 함수는 단순히 편의를 위한 것이다. */
  };
};

store.dispatch(changeCompA("b"));
/* 
  store.dispatch({
    type: 'CHANGE_COMP_A',
    data: 'b'
  })
  이거랑 같은 것이다. 
*/

console.log("2nd", store.getState());
