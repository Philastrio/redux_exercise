const initialState = [];
const PostReducer = (prevState = initialState, action) => {
  // 초기값 넣어주기
  // 1) prevState은 더이상 initialState가 아니라, 그냥 posts이다
  switch (action.type) {
    case "ADD_POST": {
      /* return{...prevState, 
        posts: [...prevState, action.data] } 이 아니라
        쪼개면 mainIndex의 initialState가 전체가 범위가 아닌 
        const initialState = {
            user: {
            isLoggingIn: true,
            data: null
          },
          posts: [],
          에서 post의 경우는 posts: [] 하나로 단위가 쪼개지기에 더 이상 객체가 아니어서 그냥
          return 한다
        */

      return [...prevState, action.data]; // 2) 여기서 그냐 prevState로 바뀐다
    }
    default: {
      // 오타나는 경우 대비
      return prevState;
    }
  }
};

module.exports = PostReducer;
