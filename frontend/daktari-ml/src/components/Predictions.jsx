import audioBkg from "../assets/digital-stethoscope.jpg"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
function Predictions(props) {
  function showRecording(audio){
    props.setSelected(audio)
    props.setPredictionActive(true)
  }
  function filterPreds(arr, query){
    return arr.filter((el)=>el.is_positive == query)
  }
  const [selectedFields, setSelectedFields] = useState([true, false, false])
  function setFilter(value){
    if (value == 'any'){
      setSelectedFields([true, false, false])
      props.setSelectedPreds(props.predictions)
    }
    else{
      (value == true) ? setSelectedFields([false, true, false]) : setSelectedFields([false, false, true])
      let res = filterPreds(props.predictions, value)
      props.setSelectedPreds(res)
    }
  }
  const recordings = props.selectedPreds && props.selectedPreds.map((audio)=>{
    return(
      <div className="min-w-[200px] min-h-[180px] bg-black mr-8 rounded-[30px] relative overflow-hidden shadow-xl cursor-grab group" key={audio.id}>
        <div className="absolute inset-0">
          <img src={ audioBkg } className="w-full h-full object-cover pointer-events-none"/>
        </div>

        <div className="absolute inset-x-0 bg-black/10 h-20 bottom-0 backdrop-blur-[10px] pl-8 flex flex-col justify-center tracking-wide group-hover:backdrop-blur-[20px] transition-all duration-300">
          <span className="font-bold text-[15px] text-white pb-2 mb-2 w-[160px] hover:border-b-2 hover:border-b-[#dd4470] transition-all duration-200 cursor-pointer" onClick={ ()=>{ showRecording(audio) } }>{ audio.patient_name }</span>
          <span className="font-bold text-[10px] text-black">{ audio.patient_id }</span>
        </div>
      </div>
    )
  })
  const sliderContainer = useRef()


  return (
    <div className="w-full h-[240px] laptop:h-[45%] mt-8 laptop:mt-0 flex items-center justify-evenly flex-col font-poppins select-none">
      <div className="w-full h-12 flex items-center justify-center">
        <div className="w-[70px] flex flex-col mr-3 cursor-pointer" onClick={ ()=>setFilter("any") }>
          <span className={ selectedFields[0] ? "hover:text-black px-4 py-2 bg-white text-[13px] font-bold text-center hover:text-[13px] hover:font-bold transition-all duration-300 " : "px-4 py-2 bg-white text-[13px] text-center text-[#ffc872] hover:text-black hover:text-[13px] hover:font-bold transition-all duration-300 "}>All</span>
          { selectedFields[0] && <hr className="border-[#dd4470] w-full border-2 rounded-full"/> }
        </div>

        <div className="w-[70px] flex flex-col mr-3 cursor-pointer" onClick={ ()=>setFilter(true) }>
          <span className={ selectedFields[1] ? "px-4 py-2 bg-white text-[13px] font-bold text-center hover:text-[13px] hover:font-bold transition-all duration-300 hover:text-black" : "px-4 py-2 bg-white text-[13px] text-center text-[#ffc872] hover:text-[13px] hover:text-black hover:font-bold transition-all duration-300 " }>Positive</span>
          { selectedFields[1] && <hr className="border-[#dd4470] w-full border-2 rounded-full"/> }
        </div>

        <div className="w-[70px] flex flex-col mr-3 cursor-pointer" onClick={ ()=>setFilter(false) }>
          <span className={ selectedFields[2] ? "px-4 py-2 bg-white text-[13px] font-bold text-center hover:text-[13px] hover:font-bold transition-all duration-300 hover:text-black" : "px-4 py-2 bg-white text-[13px] text-center text-[#ffc872] hover:text-[13px] hover:font-bold transition-all duration-300 hover:text-black" }>Negative</span>
          { selectedFields[2] && <hr className="border-[#dd4470] w-full border-2 rounded-full "/> }
        </div>

      </div>
      <motion.div className="w-[220px] h-[180px] overflow-hidden" ref={ sliderContainer } whileTap={{ cursor : "grabbing" }}>
        <motion.div className="inline-flex" drag="x" dragConstraints={ sliderContainer }>
          { recordings }
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Predictions
