import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./actions/user";

const App = () => {
  const user = useSelector(state => state.user);
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch(); // dispatch를 가져오는 훅

  const onClick = useCallback(() => {
    dispatch(
      logIn({
        id: "han",
        password: "123 "
      })
    );
  }, []);
  const onLogout = useCallback(() => {
    dispatch(logOut());
  }, []);

  return (
    <>
      {user && user.isLoggingIn ? (
        <div>로그인중</div>
      ) : user.data ? (
        <div>{user.data.nickname}</div>
      ) : (
        "로그인해주세요"
      )}
      {!user.data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
    </>
  );
};

export default App;
