import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Authenticate/action";
import {BiArrowBack} from "react-icons/bi"
import { Link, Navigate } from "react-router-dom";
const emoji = ["🏋️", "🏈", "🚴", "⚽", "🏸", "🏊‍♀️", "🏏", "🏑", "⛸", "🎮", "🤿", "🏀", "🏌️", "🏂️", "⚾️", "⛷️", "🚣", "🥏", "🤸", "🤾", "🏇", "🎳", "🏓", "⛸️", "🥊", "🏃️", "⛹️️", "🏊️️", "🏄️️", "🤽️️", "🤼️️", "🏐️️", "🎾️️", "🧘️"]
export const Login = () => {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isAuth, isError, isLoading, token } = useSelector((store) => {
    return {
      isAuth: store.authReducer.isAUTH,
      isError: store.authReducer.isError,
      isLoading: store.authReducer.isLoading,
      token: store.authReducer.token,
    };
  }, shallowEqual);

  const handleLogin = () => {
    if(email==="admin@gmail.com" && password==="admin"){
      return <Navigate to="/admin"/>
    }
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); 

  if(token){
    return <Navigate to={"/user-activity"}/>
  }
  return (
    <div isAuth={isAuth.toString()} isError={isError.toString()} className="flex justify-center items-center p-10">
      <div className="relative w-full">
        <Link to={"/"} className="absolute sm:left-[1%] lg:left-[15%] text-2xl text-slate-700 cursor-pointer hover:-translate-x-1 transition"><BiArrowBack/></Link>
        <div className="text-center">
          <span className="bg-white p-3 rounded-lg text-6xl">{emoji[emojiIndex]}</span>
        </div>
        <div className="mt-10 w-full md:w-full lg:w-[760px] m-auto">
          <h2 className="text-center font-[rubik] mb-10 text-4xl font-extrabold text-slate-700">{token ? "LOGIN SUCCESS" : "Welcome back!"}</h2>
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
            <button onClick={handleLogin} className="bg-black text-white py-3 font-medium rounded-lg hover:bg-black/9 0">{isLoading?"Loding...":"Login"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};


