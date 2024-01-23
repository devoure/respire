import { useState, useRef, useContext } from "react"
import { IoClose } from "react-icons/io5"
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FaIdBadge } from "react-icons/fa6"
import { FaCamera } from "react-icons/fa"
import { FaUnlockKeyhole } from "react-icons/fa6"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { AuthContext } from "../contexts/AuthContext.jsx"
function CreateAccount(props) {
  const isDesktop = useMediaQuery({minWidth : 1400})
  const isLaptop = useMediaQuery({ minWidth : 1024 })
  const isTablet = useMediaQuery({ minWidth : 640, minHeight:960 })
  const mainVariants = {
    hidden : { 
      y : isTablet ? "720px" : isLaptop ? "420px" : isDesktop ? "" : "420px",
    backgroundColor : "#fce4bf"
  },
    visible : {
    y : "0px",
    backgroundColor : "#ffffff",
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
  let userDetails = new FormData()
  let { createAccount } = useContext(AuthContext)
  const [photo, setPhoto] = useState(false)
  const [userData, setUserData] = useState({
    username : "",
    first_name : "",
    email : "",
    img : "",
    password : "",
    password2 : ""
  })

  function handlePhoto(e){
    setPhoto(e.target.files[0])
  }

  function handleSignUp(e){
    setUserData((prev)=>{
      return(
        { ...prev, [e.target.name]:e.target.value }
      )
    })
  }

  function saveChanges(e){
    userDetails.append('first_name', userData.first_name.split(" ")[0])
    userDetails.append('last_name', userData.first_name.split(" ")[1])
    photo && userDetails.append('photo', photo)
    userDetails.append('email', userData.email)
    userDetails.append('username', userData.username)
    userDetails.append('password', userData.password)
    userDetails.append('password2', userData.password2)

    createAccount(e, userDetails)
  }
  return (
    <motion.div className="absolute w-full h-[540px] tablet:h-full tablet:w-[500px] bg-[#fce4bf] rounded-t-[30px] tablet:rounded-t-[45px] laptop:rounded-t-[30px] overflow-hidden flex flex-col items-center group"  variants={ mainVariants } animate={ props.accountActive ? "visible" : "hidden" }>
      <div className="w-full h-[50px] flex  flex-col items-center justify-center relative">
        <span className={props.accountActive ? "p-3 text-[16px] font-bold" : "p-3 text-[16px] font-bold cursor-pointer"} onClick={ ()=>{ props.setAccountActive(true) } }>Create Account</span>
        <hr  className={props.accountActive ? "border-2 w-40 rounded-full border-[#dd4470]" : "border-2 w-8 rounded-full border-[#dd4470] group-hover:w-40 transition-all duration-300"}/>
        { props.accountActive &&
        <div className="absolute h-12 w-12 right-[20px] rounded-full flex items-center justify-center cursor-pointer bg-white hover:bg-[#dd4470] transition-all duration-300" onClick={ ()=>{ props.setAccountActive(false) } }>
          <IoClose className="text-3xl"/>
        </div>
        }
      </div>

      <div className="w-full h-12 text-[12px] flex items-center justify-center">
        <p>Already have an account ? <span className="font-bold text-[#dd4470] hover:border-b-2 border-b-[#dd4470] pb-2 transition-all duration-200 cursor-pointer" onClick={ ()=>{ props.setAccountActive(false); props.setLoginActive(true) } }>Login</span></p>
      </div>

      <motion.div className="w-[320px] h-[320px] tablet:h-[500px] laptop:h-[320px] desktop:h-[500px] flex flex-col justify-evenly overflow-hidden" variants={ inputVariants } animate={ props.accountActive ? "visible" : "hidden" }>
        <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
          <FaUser className="text-xl ml-6"/>
          <input type="text" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Physician Full Name" name="first_name" onChange={ handleSignUp } value={ userData.first_name } required/>
        </motion.div>

        <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
          <MdEmail className="text-xl ml-6"/>
          <input type="email" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Physician Email" name="email" onChange={ handleSignUp } value={ userData.email } required/>
        </motion.div>

        <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
          <FaIdBadge className="text-xl ml-6"/>
          <input type="text" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Physician ID" name="username" onChange={ handleSignUp } value={ userData.username } required/>
        </motion.div>

        <motion.label htmlFor="uploadProf" className="w-full h-14 border-b-2 border-[#dd4470] flex items-center cursor-pointer" variants={ inputVariants }>
          <FaCamera className="text-xl ml-6" />
          <input type="file" className="hidden" id="uploadProf" name="photo" onChange={ handlePhoto } />
          <span className={ photo ? "ml-6 text-[12px] text-green-700" :  "ml-6 text-[12px] text-[#dd4470]" }>{ photo ? photo.name : "Physician Photo" }</span>
        </motion.label>

        <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
          <FaUnlockKeyhole className="ml-6 text-xl"/>
          <input type="password" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Enter Password" name="password" required onChange={ handleSignUp } value={ userData.password }/>
        </motion.div>

        <motion.div className="w-full h-14 border-b-2 border-[#dd4470] flex items-center" variants={ inputVariants }>
          <FaUnlockKeyhole className="ml-6 text-xl"/>
          <input type="password" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Confirm Password" name="password2" required onChange={ handleSignUp } value={ userData.password2 }/>
        </motion.div>
      </motion.div>

      <div className="w-[180px] h-12 bg-[#dd4470] mt-3 tablet:mt-16 laptop:mt-3 desktop:mt-16 flex items-center justify-center rounded-[25px] cursor-pointer hover:w-[200px] transition-all duration-300" onClick={ saveChanges }>
        <span className="text-[#fce4bf] font-bold text-[12px]">Create Account</span>
      </div>
    </motion.div>
  )
}

export default CreateAccount
