import React from 'react'
import landingPoster from "../assets/landingPoster.jpeg";
import landingVideo from "../assets/por-video.mp4"
import styles from "./Home.module.css";
export const Home = () => {
    let circleText = "make it personal";
    return (
        <div>
            <div>
                <div>
                    <div className='relative -mt-[6.5rem] w-full'>
                        <div className='flex'>
                            <div className='w-[80%]'>
                                <img className='w-[100%]' src={landingPoster} alt="Poster-1" />
                            </div>
                            <div className='bg-[#E9D1CA] w-[20%] overflow-hidden'>
                                <h1 className={`${styles.verticalText} text-transparent text-[10rem] font-bold tracking-wider`}>#makemefitquest</h1>
                            </div>
                        </div>
                        <div className='absolute top-[75%] left-[50%] transform -translate-x-[50%] -translate-y-[75%]'>
                            <div className='absolute -mt-56 -ml-40'>
                                <h1 className={`${styles.outlinetext} text-9xl text-transparent font-bold tracking-widest`}>back to</h1>
                                <h1 className='text-9xl font-bold tracking-widest text-white'>results</h1>
                            </div>
                            <div className='absolute left-[100%]'>
                                <div className='circle relative w-[200px] h-[200px] rounded-full flex justify-center items-center'>
                                    <div className='absolute w-[100%] h-[100%]'>
                                        <p className='text-white'>
                                            {
                                                circleText.split("").map((char,i)=>(
                                                    <span style={{ transform: `rotate(${i * 15}deg)` }} className={`${styles.rotatedText} absolute left-[50%] text-xl`}>{char}</span>
                                                ))
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <video className='w-[700px]' src={landingVideo} autoPlay loop muted></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
