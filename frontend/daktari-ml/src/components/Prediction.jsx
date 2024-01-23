import { AuthContext } from "../contexts/AuthContext.jsx"
import { motion } from "framer-motion"
import recordingImg from "../assets/digital-stethoscope.jpg"
import { IoArrowBackOutline } from "react-icons/io5"
import { PiTestTubeFill } from "react-icons/pi";
import { FaIdBadge } from "react-icons/fa6"
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { useState, useRef, useEffect, useContext } from "react"
import { useMediaQuery } from "react-responsive"
function Prediction(props) {
  let { hostUrl } = useContext(AuthContext)
  const isDesktop = useMediaQuery({minWidth : 1400})
  const isLaptop = useMediaQuery({ minWidth : 1024 })
  const isTablet = useMediaQuery({ minWidth : 640, minHeight:960 })
  const mainVariants = {
    hidden : { 
      x : isTablet ? "720px" : isLaptop ? "-550px" : isDesktop ? "" : "-375px",
    },
    visible : {
    x : "0px",
    transition: {
        delay: 0.3,
      }
  }
  }
  const playingVariants = {
    playing : {
      rotate : 360,
      transition : { duration : 2, repeat : Infinity, ease: "linear" }
    },
    pause: {
      rotate : 0
    }
  }
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioDetails, setAudioDetails] = useState(false)
  const player = useRef()
  const progressBar = useRef()
  useEffect(()=>{
    if (isPlaying){
      player.current.play()
    }else{
      player.current.pause()
    }
  }, [isPlaying])
  function playingDetails(){
    const duration = player.current.duration
    const ct = player.current.currentTime

    setAudioDetails({ "progress" : ct / duration * 100, "length" : duration})
  }
  function seek(e){
    if (isPlaying){
      let width = progressBar.current.clientWidth
      const offset = e.nativeEvent.offsetX

      const seeked = offset / width * 100
      player.current.currentTime = seeked / 100 * audioDetails.length
    }
  }
  return (
    <motion.div className="laptop:w-[30%] z-10 laptop:h-screen laptop:min-h-max absolute inset-0 laptop:inset-y-0 bg-[#dd4470]/50 backdrop-blur-[20px] flex flex-col items-center justify-between font-poppins select-none min-w-[375px] min-h-[667px] overflow-hidden" variants={ mainVariants } animate={ props.predictionActive ? "visible" : "hidden" }> 
      <div className="w-full h-24 flex items-center justify-between ml-6">
        <div className="w-12 h-12 hover:bg-white/60 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer group" onClick={ ()=>{ props.setPredictionActive(false) } }>
          <IoArrowBackOutline className="text-2xl text-white group-hover:text-[#dd4470] transition-all duration-300"/>
        </div>

        <div className="w-80 font-bold text-white">
          <span>Patient, { props.selected.patient_name }</span>
        </div>
      </div>
      <div className="bg-white/60 w-full h-[560px] laptop:h-[480px] overflow-hidden rounded-t-[40px] laptop:mb-[50px] laptop:rounded-[40px] flex flex-col justify-evenly">
        <div className="w-full h-[250px] flex items-center justify-center">
          <motion.div className="w-[180px] h-[180px] bg-black rounded-full shadow-xl relative overflow-hidden" variants={ playingVariants } animate={ isPlaying ? "playing" : "pause" }>
            <img src={recordingImg} className="absolute w-full h-full object-cover object-right"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full">
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full h-52 overflow-hidden flex flex-col items-center">
          <div className="w-full flex ml-8 flex-col">
            <span className="font-bold text-[17px] text-[#dd4470] mb-4">{ props.selected.patient_name }</span>
            <div className="flex w-full items-center mb-4">
              <FaIdBadge  className="text-[24px] text-[#2a0e16] mr-4"/>
              <span className="text-[12px] text-[#2a0e16]">{ props.selected.patient_id }</span>
            </div>
            <div className="flex w-full items-center mb-4">
              <PiTestTubeFill  className="text-[24px] text-[#2a0e16] mr-4"/>
              <span className="text-[12px] text-[#2a0e16]">{ props.selected.is_positive ? `Positive, (Predicted Illness : ${props.selected.prediction})` : `Negative, (Predicted Illness : ${ props.selected.prediction })` }</span>
            </div>
          </div>
          <div className="relative w-full h-16 flex items-center justify-center">
            <div className="w-[320px] bg-[#2a0e16] h-[4px] rounded-[10px] cursor-pointer" onClick={ seek } ref={ progressBar }>
              <div className="w-0 h-full bg-[#dd4470] rounded-[10px] after:block after:w-[14px] after:h-[14px] after:bg-white after:absolute relative after:right-0 after:top-[-6px] after:rounded-full after:shadow-xl" style={{ width : `${ audioDetails.progress + "%"}` }}>
              </div>
            </div>

            <span className="font-bold text-[#2a0e16] text-[10px] absolute left-5 bottom-0">{ audioDetails.progress && `${ Math.floor(audioDetails.progress / 60) } : ${(Math.floor(audioDetails.progress % 60) < 10) ? "0" + Math.floor(audioDetails.progress % 60) : Math.floor(audioDetails.progress % 60)}` }</span>
            <span className="font-bold text-[#2a0e16] text-[10px] absolute right-5 bottom-0"> { audioDetails.length && `${ Math.floor(audioDetails.length / 60) } : ${(Math.floor(audioDetails.length % 60) < 10) ? "0" + Math.floor(audioDetails.length % 60) : Math.floor(audioDetails.length % 60)}` }</span>

          </div>
        </div>
        <div className="w-full h-16 flex items-center justify-center">
          <audio src={ hostUrl + props.selected.audio } ref={ player } onTimeUpdate={ playingDetails }/>
          <div className={ isPlaying ? " w-16 h-16 bg-[#dd4470] rounded-xl flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 mb-8" :  " w-16 h-16 bg-[#dd4470] rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 mb-8" } onClick={ ()=>{ setIsPlaying((prev)=>!prev) } }>
            { isPlaying ? <FaPause  className="text-2xl"/> : <FaPlay className="text-2xl"/> }
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Prediction
