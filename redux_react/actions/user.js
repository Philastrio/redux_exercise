const logIn = data => {
  // async action creator / 비동기 액션 / 비동기라는 것을 보여주기 위해 함수를 리턴한다
  return (dispatch, getState) => {
    dispatch(logInRequest(data)); // 동기 부르고
    try {
      setTimeout(() => {
        // 비동기 작업 부르고
        dispatch(
          logInSuccess({
            userId: 1,
            nickname: "han"
          })
        ); // 비동기 작업끝날때 비동기 한번 더 부르고
      }, 2000); /* 지금 서버가 없으므로 로그인에 2초가 걸린다고 가정하고 만들자 
      나중에는 axios.post().then().catch()를 사용한다
      */
    } catch (e) {
      dispatch(logInFailure()); // 실패할 경우, 보통이렇게 3개로 구성한다
    }
  };
};

const logInRequest = data => {
  // 동기
  return {
    type: "LOG_IN_REQUEST",
    data // data는 매개변수를 통해서 들어온다
  };
};
const logInSuccess = data => {
  // 동기
  return {
    type: "LOG_IN_SUCCESS",
    data
  };
};
const logInFailure = data => {
  // 동기
  return {
    type: "LOG_IN_FAILURE",
    error
  };
};

const logOut = data => {
  return {
    type: "LOG_OUT"
  };
};

module.exports = {
  logIn,
  logOut
};
