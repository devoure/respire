import { IoClose } from "react-icons/io5"
import headerImg from "../assets/addPred.svg"
import { FaUser } from "react-icons/fa"
import { PiMusicNotesPlus } from "react-icons/pi";
import { FaIdBadge } from "react-icons/fa6"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import logo from "../assets/daktarimlogo.svg"
function AddPrediction(props) {
  const [audio, setAudio] = useState(false)
  let navigate = useNavigate()
  let { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [patientData, setPatientData] = useState({
    patientName : "",
    patientId : ""
  })

  function handleAudio(e){
    setAudio(e.target.files[0])
  }

  function handlePatientData(e){
    setPatientData((prev)=>{
      return(
        { ...prev, [e.target.name]:e.target.value }
      )
    })
  }
  let predDetails = new FormData()

  let predict = async (e, predDetails) => {
    e.preventDefault()
    setLoading(true)

    let response = await fetch('http://127.0.0.1:8000/api/model/v1/predict/', {
      method:'POST',
      //headers:{
      //  'Content-Type':'application/json'
      //},
      body: predDetails
    })

    let data = await response.json()
    setLoading(false)
    if (data == "ERROR"){
      alert("Something went wrong, try again !")
    }else{ 
      navigate("/pred-success", { state: {prediction:data} })
    }
  }
  function saveChanges(e){
    predDetails.append('doctor', user.user_id)
    predDetails.append('patient_name', patientData.patientName)
    audio && predDetails.append('audio', audio)
    predDetails.append('patient_id', patientData.patientId)

    predict(e, predDetails)
  }
  const isDesktop = useMediaQuery({minWidth : 1400})
  const isLaptop = useMediaQuery({ minWidth : 1024 })
  const isTablet = useMediaQuery({ minWidth : 640, minHeight:960 })
  const mainVariants = {
    hidden : { 
      y : isTablet ? "720px" : isLaptop ? "-800px" : isDesktop ? "" : "-667px",
    },
    visible : {
    y : "0px",
    transition: {
        delay: 0.3,
      }
  }
  }
  const inputVariants = {
    hidden:{
      x: -10,
      opacity:0
    },
    visible:{
      x: 0,
      opacity:1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.3,
      },
    }
  }

  const loadingVariants = {
    loading : {
      rotate : 360,
      transition : { duration : 2, repeat : Infinity, ease: "linear" }
    },
    notLoading: {
      rotate : 0
    }
  }
  return (
    <motion.div className="select-none absolute inset-0 bg-white/50 backdrop-blur-[20px] flex items-center justify-center font-poppins" variants={ mainVariants } animate={ props.addPrediction ? "visible" : "hidden" }>
      { loading ?
      <div className="bg-white/60 w-[320px] h-[300px] rounded-3xl shadow-xl overflow-hidden relative flex flex-col items-center justify-center">
        <motion.div className="h-24 w-24 rounded-full mb-8" variants={ loadingVariants } animate={ loading ? "loading" : "notLoading" }>
          <img src={ logo } className="w-full h-full object-cover" />
        </motion.div>
        <span className="font-bold tracking-wide ">Predicting ...</span>
      </div>
      :
      <div className="bg-white/60 w-[320px] h-[560px] laptop:w-[400px] rounded-3xl shadow-xl overflow-hidden relative flex flex-col items-center">
        <div className="w-12 h-12 bg-white/70 rounded-full absolute right-2 top-2 hover:shadow-xl cursor-pointer flex items-center justify-center group hover:bg-[#dd4470] transition-all duration-300" onClick={ ()=>{ props.setAddPrediction(false) } }>
          <IoClose className="text-3xl group-hover:text-white transition-all duration-300"/>
        </div>
        <div className="w-full h-16 flex items-center font-bold ml-8 text-[16px]">
          <span>Add details for prediction</span>
        </div>
        <div className="w-[300px] laptop:w-[360px] h-[170px] laptop:h-[200px] rounded-[20px] overflow-hidden">
          <img src={ headerImg } className="w-full h-full object-cover" />
        </div>
        <div className="w-[300px] h-[240px] flex flex-col items-center justify-evenly">
          <motion.label htmlFor="uploadProf" className="w-full h-24 hover:bg-[#dd4470] cursor-pointer transition-all duration-300 group flex  flex-col items-center justify-center cursor-pointer" variants={ inputVariants }>
            <PiMusicNotesPlus className="text-[32px] ml-6 mb-2" />
            <input type="file" className="hidden" id="uploadProf" name="photo" onChange={ handleAudio } />
            <span className={ audio ? "ml-6 text-[12px] text-green-700" :  "ml-6 text-[12px] text-[#dd4470] group-hover:text-white transition-all duration-300" }>{ audio ? audio.name : "Add Respiratory Sound" }</span>
          </motion.label>
          <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
            <FaUser className="text-xl ml-6"/>
            <input type="text" className="ml-6 bg-transparent outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Add Patient Name" name="patientName" onChange={ handlePatientData } value={ patientData.patientName } required/>
          </motion.div>
          <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
            <FaIdBadge className="text-xl ml-6"/>
            <input type="text" className="bg-transparent ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Add Patient ID" name="patientId" onChange={ handlePatientData } value={ patientData.patientId } required/>
          </motion.div>
        </div>
        <div className="flex">
          <span className="bg-black py-2 px-6 rounded-[20px] text-white hover:bg-[#dd4470] hover:px-8 transition-all duration-300 cursor-pointer" onClick={ saveChanges }>Predict</span>
        </div>

      </div>
      }
    </motion.div>
  )
}

export default AddPrediction
