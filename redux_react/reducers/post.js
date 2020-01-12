const { produce } = require("immer");

const initialState = [];
const PostReducer = (prevState = initialState, action) => {
  return produce(prevState, draft => {
    switch (action.type) {
      case "ADD_POST":
        draft.push(action.data);
        break;
      default: {
        // 오타나는 경우 대비
        break;
      }
    }
  });
  // 초기값 넣어주기
  // 1) prevState은 더이상 initialState가 아니라, 그냥 posts이다
};

module.exports = PostReducer;
