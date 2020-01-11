const initialState = [];
const PostReducer = (prevState = initialState, action) => {
  // 1) prevState은 더이상 initialState가 아니라, 그냥 posts이다
  switch (action.type) {
    case "ADD_POST": {
      return {
        ...prevState, //얕은 복사
        posts: [...prevState, action.data] // 2) 여기서 그냐 prevState로 바뀐다
      };
    }
    default: {
      // 오타나는 경우 대비
      return prevState;
    }
  }
};

module.exports = PostReducer;
