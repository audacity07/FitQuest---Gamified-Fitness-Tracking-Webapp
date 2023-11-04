import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Authenticate/action";
const emoji = ["🏋️", "🏈", "🚴", "⚽", "🏸", "🏊‍♀️", "🏏", "🏑", "⛸", "🎮", "🤿", "🏀", "🏌️", "🏂️", "⚾️", "⛷️", "🚣", "🥏", "🤸", "🤾", "🏇", "🎳", "🏓", "⛸️", "🥊", "🏃️", "⛹️️", "🏊️️", "🏄️️", "🤽️️", "🤼️️", "🏐️️", "🎾️️", "🧘️"]
export const Login = () => {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isAuth, isError } = useSelector((store) => {
    return {
      isAuth: store.authReducer.isAUTH,
      isError: store.authReducer.isError,
    };
  }, shallowEqual);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData)).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex((prevIndex) => (prevIndex + 1) % emoji.length);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div isAuth={isAuth.toString()} isError={isError.toString()} className="flex justify-center items-center p-10">
      <div className="w-full">
        <div className="text-center">
          <span className="bg-white p-3 rounded-lg text-6xl">{emoji[emojiIndex]}</span>
        </div>
        <div className="mt-10 w-[40%] m-auto">
          <h2 className="text-center font-[rubik] mb-10 text-4xl font-extrabold text-slate-700">{isAuth ? "LOGIN SUCCESS" : "Welcome back!"}</h2>
          <div className="flex flex-col gap-10">
            <input
              className="w-full px-2 py-3 rounded-lg outline-orange-200"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name=""
              placeholder="email@gmail.com"
              value={email}
            />
            <input
              className="w-full px-2 py-3 rounded-lg outline-orange-200"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              placeholder="password"
              value={password}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};


