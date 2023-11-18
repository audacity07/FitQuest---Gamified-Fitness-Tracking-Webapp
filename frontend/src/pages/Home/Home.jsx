import React from "react";
import landingPoster from "../../assets/landingPoster.jpeg";
import gymExercisPoster1 from "../../assets/asset-1.jpeg";
import gymExercisPoster2 from "../../assets/asset-2.jpeg";
import landingVideo from "../../assets/por-video.mp4";
import styles from "./Home.module.css";
import Marquee from "react-fast-marquee";
import bigPoster from "../../assets/asset-4.jpeg";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

const manuLinks = [
  { title: "personal training", href: "/", dataText: "personal training" },
  { title: "duo training", href: "/", dataText: "duo training" },
  { title: "fitlab for her", href: "/", dataText: "fitlab for her" },
  { title: "business", href: "/", dataText: "business" },
  { title: "yoga", href: "/", dataText: "yoga" },
  { title: "fitlab at home", href: "/", dataText: "fitlab at home" },
];

export const Home = () => {
  let circleText = "m ake it personal-m ake it personal-";
  const customStyle = {
    WebkitTextStroke: "1px #000",
  };
  const customStyle2 = {
    WebkitTextStroke: "1px #fff",
  };
  return (
    <div>
      <Navbar />
      <section>
        <div>
          <div className="relative -mt-[6.5rem] w-full">
            <div className="flex">
              <div className="w-[80%]">
                <img className="w-[100%]" src={landingPoster} alt="Poster-1" />
              </div>
              <div className="bg-[#E9D1CA] w-[20%] overflow-hidden">
                <h1
                  className={`${styles.verticalText} text-transparent text-[10rem] font-bold tracking-wider`}
                >
                  #makemefitquest
                </h1>
              </div>
            </div>
            <div className="absolute top-[75%] left-[50%] transform -translate-x-[50%] -translate-y-[75%]">
              <div className="absolute -mt-56 -ml-40">
                <h1
                  className={`${styles.outlinetext} text-9xl text-transparent font-bold tracking-widest`}
                >
                  back to
                </h1>
                <h1 className="text-9xl font-bold tracking-widest text-white">
                  results
                </h1>
              </div>
              <div className="absolute left-[85%] -top-24">
                <div className="circle relative w-[200px] h-[200px] rounded-full flex justify-center items-center">
                  <div
                    className={`${styles.circleText} absolute w-[100%] h-[100%]`}
                  >
                    <p className="text-white">
                      {circleText.split("").map((char, i) => (
                        <span
                          key={i}
                          style={{ transform: `rotate(${i * 10}deg)` }}
                          className={`${styles.rotatedText} absolute left-[50%] text-xl font-bold`}
                        >
                          {char}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <video
                className="w-[700px]"
                src={landingVideo}
                autoPlay
                loop
                muted
              ></video>
              <div className="absolute w-[600px] bg-white p-10 -mt-20 -ml-40 hover:-ml-36 transition-all duration-300">
                <h3 className="text-3xl font-bold tracking-wider mb-3">
                  personal training enschede
                </h3>
                <p className="text-lg font-bold tracking-wider">
                  Afvallen? Spieren opbouwen? Fitter worden? Conditie opbouwen?
                  Welke doelen je ook hebt: start nú bij fitlab: Met onze
                  complete begeleiding weet je in elk geval zeker dat je jouw
                  doelen ook écht gaat halen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`relative flex justify-center items-center overflow-hidden`}
      >
        <Marquee
          speed={1}
          style={{ overflowY: "hidden", paddingBlock: "20px" }}
        >
          <span
            className={` ${styles.horizontalScrollText} text-transparent text-8xl font-bold`}
          >
            .workout.live.repeat.move.breath
          </span>
          <span
            className={` ${styles.horizontalScrollText} text-transparent text-8xl font-bold`}
          >
            .workout.live.repeat.move.breath
          </span>
        </Marquee>
        <div className="bg-[#E9D1CA] w-[20%] h-[8.6rem] absolute right-0"></div>
      </section>

      <section className="relative">
        <div className="flex justify-around px-20 mt-20">
          <h1 className="text-7xl font-bold">
            this is our <br />
            playground.
            <br />
            welcome to <br />
            fitlab:
          </h1>
          <p className="self-end text-xl font-light">
            Neem je je al tijden voor om nou écht eens
            <br />
            iets aan sport te gaan doen? Dan is fitlab:
            <br />
            dé studio om de beste start te maken. Met
            <br />
            een persoonlijk programma dat exact bij <br />
            jou past.
          </p>
        </div>
        <div className="bg-[#E9D1CA] w-[20%] h-screen absolute -top-20 right-0 -z-10"></div>
      </section>

      <section className="relative flex justify-center items-center mt-40">
        <div className="-mr-20">
          <img className="w-[80%]" src={gymExercisPoster1} alt="" />
        </div>
        <div>
          <img src={gymExercisPoster2} alt="" />
        </div>
        <div className="absolute left-[5%] top-1">
          <div className="circle relative w-[200px] h-[200px] rounded-full flex justify-center items-center">
            <div className={`${styles.circleText} absolute w-[100%] h-[100%]`}>
              <p className="text-black">
                {circleText.split("").map((char, i) => (
                  <span
                    key={i}
                    style={{ transform: `rotate(${i * 10}deg)` }}
                    className={`${styles.rotatedText} absolute left-[50%] text-xl font-bold`}
                  >
                    {char}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#E9D1CA] w-[20%] h-[1000px] absolute top-8 right-0 -z-10"></div>
      </section>

      <section className="relative">
        <div className="flex flex-col mt-40 w-[75%] m-auto gap-2">
          {manuLinks.map((link, index) => {
            return (
              <div className="overflow-hidden">
                <div>
                  <Link
                    to={link.href}
                    style={customStyle}
                    dataText={link.dataText}
                    className={`${styles.mobileLavlink} relative text-6xl uppercase py-1 line-clamp-1 text-transparent font-extrabold tracking-widest inline`}
                  >
                    {link.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-[#E9D1CA] w-[20%] h-[1010px] absolute top-8 right-0 -z-10"></div>
      </section>

      <section className="relative mt-20">
        <div className="w-[80%]">
          <img className="w-full" src={bigPoster} alt="" />
        </div>
        <div className="absolute right-96 -bottom-20 bg-white rounded-full z-10">
          <div className="circle relative w-[200px] h-[200px] rounded-full flex justify-center items-center">
            <div className={`${styles.circleText} absolute w-[100%] h-[100%]`}>
              <p className="text-black">
                {circleText.split("").map((char, i) => (
                  <span
                    key={i}
                    style={{ transform: `rotate(${i * 10}deg)` }}
                    className={`${styles.rotatedText} absolute left-[50%] text-xl font-bold`}
                  >
                    {char}
                  </span>
                ))}
              </p>
            </div>
            <div className="bg-[#E9D1CA] w-[130px] h-[130px] rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="bg-black p-20">
          <h1 className="text-white text-8xl font-bold">
            <span style={customStyle2} className="text-transparent">
              stick with{" "}
            </span>{" "}
            <br />
            the facts
          </h1>
          <p className="text-white max-w-[620px] text-xl font-light mt-[3rem]">
            Zomaar trainen kan iedereen. Fitlab: doet het anders. Wij maken voor
            jou een uniek, individueel programma dat exact aansluit bij jouw
            wensen en conditie. Gebaseerd op wetenschappelijk bewijs en
            onderbouwd met feiten. Waarbij leeftijd trouwens geen rol speelt. De
            snelste weg naar resultaat.
          </p>
        </div>
        <div className="bg-[#E9D1CA] w-[20%] h-full absolute top-0 right-0"></div>
      </section>

      <section className="py-20 bg-[#183330]">
        <div
          className={`relative flex justify-center items-center overflow-hidden`}
        >
          <Marquee
            speed={1}
            style={{ overflowY: "hidden", paddingBlock: "20px" }}
          >
            <span
              className={` ${styles.horizontalScrollText} text-white text-8xl font-bold`}
            >
              first some information
            </span>
            <span
              className={`${styles.horizontalScrollText} ${styles.horizontalScrollText2} text-transparent text-8xl font-bold`}
            >
              first some information
            </span>
          </Marquee>
        </div>

        <div className="flex ml-40 gap-36 text-white mt-20">
          <div>
            <h3 className="text-2xl font-semibold mb-5">
              We would like more <br />
              information on:
            </h3>
            <div className="flex flex-col gap-6">
              <label className="block cursor-pointer relative pl-[30px]">
                <input
                  type="radio"
                  className={` ${styles.inputCircle} hidden`}
                />
                <span
                  className={` ${styles.radioCircle} w-[20px] h-[20px] inline-block border-2 rounded-full absolute left-0 top-1 before:content-[""] before:absolute before:w-[10px] before:h-[10px] before:bg-[#E9D1CA] before:rounded-full before:ml-[0.21rem] before:mt-[0.2rem]`}
                ></span>
                <span className="font-light text-lg ml-4">
                  Personal training
                </span>
              </label>
              <label className="block cursor-pointer relative pl-[30px]">
                <input
                  type="radio"
                  className={` ${styles.inputCircle}  hidden`}
                />
                <span
                  className={` ${styles.radioCircle} w-[20px] h-[20px] inline-block border-2 rounded-full absolute left-0 top-1
                                before:content-[""] before:absolute before:w-[10px] before:h-[10px] before:bg-[#E9D1CA] before:rounded-full before:ml-[0.21rem] before:mt-[0.2rem]`}
                ></span>
                <span className="font-light text-lg ml-4">Duo training</span>
              </label>
              <label className="block cursor-pointer relative pl-[30px]">
                <input
                  type="radio"
                  className={` ${styles.inputCircle}  hidden`}
                />
                <span
                  className={` ${styles.radioCircle} w-[20px] h-[20px] inline-block border-2 rounded-full absolute left-0 top-1
                                before:content-[""] before:absolute before:w-[10px] before:h-[10px] before:bg-[#E9D1CA] before:rounded-full before:ml-[0.21rem] before:mt-[0.2rem]`}
                ></span>
                <span className="font-light text-lg ml-4">Fitlab: for her</span>
              </label>
              <label className="block cursor-pointer relative pl-[30px]">
                <input
                  type="radio"
                  className={` ${styles.inputCircle}  hidden`}
                />
                <span
                  className={` ${styles.radioCircle} w-[20px] h-[20px] inline-block border-2 rounded-full absolute left-0 top-1
                                before:content-[""] before:absolute before:w-[10px] before:h-[10px] before:bg-[#E9D1CA] before:rounded-full before:ml-[0.21rem] before:mt-[0.2rem]`}
                ></span>
                <span className="font-light text-lg ml-4">
                  Fitlab: business
                </span>
              </label>
              <label className="block cursor-pointer relative pl-[30px]">
                <input
                  type="radio"
                  className={` ${styles.inputCircle}  hidden`}
                />
                <span
                  className={` ${styles.radioCircle} w-[20px] h-[20px] inline-block border-2 rounded-full absolute left-0 top-1
                                before:content-[""] before:absolute before:w-[10px] before:h-[10px] before:bg-[#E9D1CA] before:rounded-full before:ml-[0.21rem] before:mt-[0.2rem]`}
                ></span>
                <span className="font-light text-lg ml-4">Yoga</span>
              </label>
            </div>
          </div>
          <div className="w-[40%]">
            <h3 className="text-2xl font-semibold mb-5">
              We can be reached through <br />
              this information:
            </h3>
            <form className="flex flex-col gap-5">
              <input
                type="text"
                className="bg-transparent border-b placeholder:text-white/75 outline-none p-1 transition focus:border-[#E9D1CA]"
                placeholder="Name"
              />
              <input
                type="text"
                className="bg-transparent border-b placeholder:text-white/75 outline-none p-1 transition focus:border-[#E9D1CA]"
                placeholder="Mobile Number"
              />
              <input
                type="text"
                className="bg-transparent border-b placeholder:text-white/75 outline-none p-1 transition focus:border-[#E9D1CA]"
                placeholder="Email address"
              />
              <textarea
                className="bg-transparent border-b placeholder:text-white/75 outline-none p-1 transition focus:border-[#E9D1CA]"
                placeholder="Message"
              />
              <div>
                <span
                  style={customStyle2}
                  dataText="send now"
                  className={`${styles.sendNowBtn} relative text-5xl  py-1 line-clamp-1 text-transparent font-extrabold tracking-widest inline cursor-pointer`}
                >
                  send now
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
