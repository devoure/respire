import { AuthContext } from "../contexts/AuthContext.jsx"
import { useState, useContext } from "react"
import { IoClose } from "react-icons/io5"
import { FaIdBadge } from "react-icons/fa6"
import { FaUnlockKeyhole } from "react-icons/fa6"
import loginImg from "../assets/daktarimllogin.svg"
import { motion } from "framer-motion"
import { useMediaQuery } from 'react-responsive'
function Login(props) {
  const isDesktop = useMediaQuery({minWidth : 1400})
  const isLaptop = useMediaQuery({ minWidth : 1024 })
  const isTablet = useMediaQuery({ minWidth : 640 , minHeight: 960})
  const mainVariants = {
    hidden : { 
      y : isTablet ? "780px" : isLaptop ? "480px" : isDesktop ? "" : "480px",
    backgroundColor : "#dd4470"
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
  let { loginUser } = useContext(AuthContext)
  const [loginCred, setLoginCred] = useState({
    username : "",
    password : ""
  })

  function handleLoginInput(e){
    setLoginCred((prev)=>{
      return(
        {...prev, [e.target.name]:e.target.value}
      )
    })
  }

  function loginBtn(e){
    let usernameLen = loginCred.username.length
    let passwordLen = loginCred.password.length
    if (usernameLen > 0 && passwordLen > 0){
      loginUser(e, loginCred)
      setLoginCred({ username:"", password: "" })
    }
  }
  return (
    <motion.div className={ props.accountActive ? "absolute w-full h-[540px] tablet:h-full tablet:w-[500px] bg-[#dd4470] rounded-t-[30px] tablet:rounded-t-[45px] laptop:rounded-t-[30px] overflow-hidden flex flex-col items-center select-none group pointer-events-none opacity-60 transition-all duration-700" : "absolute w-full h-[540px] tablet:h-full tablet:w-[500px] bg-[#dd4470] rounded-t-[30px] tablet:rounded-t-[45px] laptop:rounded-t-[30px] overflow-hidden flex flex-col items-center select-none group" } variants={ mainVariants } animate={ props.loginActive ? "visible" : "hidden" }>
      <div className="w-full h-[50px] flex  flex-col items-center justify-center relative">
        <span className={ props.loginActive ? "p-3 text-[16px] font-bold" : "p-3 text-[16px] font-bold cursor-pointer" } onClick={ ()=>{ props.setLoginActive(true) } }>Login</span>
        <hr  className={props.loginActive ? "border-2 w-24 rounded-full border-[#fce4bf]" : "border-2 w-8 rounded-full border-[#fce4bf] group-hover:w-24 transition-all duration-300" }/>
        { props.loginActive && 
        <div className="absolute h-12 w-12 right-[20px] rounded-full flex items-center justify-center cursor-pointer bg-white hover:bg-[#fce4bf] transition-all duration-300" onClick={ ()=>{ props.setLoginActive(false) } }>
          <IoClose className="text-3xl"/>
        </div>
        }
      </div>
      <div className="w-[320px] h-[180px] mt-6 tablet:h-[260px] laptop:h-[180px] desktop:h-[260px]">
        <img src={ loginImg } className="w-full h-full object-cover object-center"/>
      </div>

      <motion.div className="w-[320px] h-[150px] tablet:h-[300px] desktop:h-[300px] laptop:h-[150px] mt-6 flex flex-col items-center justify-evenly" variants={ inputVariants } animate={props.loginActive ? "visible" : "hidden" }>
        <motion.div className="w-full h-14 border-b-2 border-[#fce4bf] flex items-center" variants={ inputVariants }>
          <FaIdBadge className="text-xl ml-6"/>
          <input type="text" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Physician ID" required name="username" value={ loginCred.username } onChange={ handleLoginInput }/>
        </motion.div>
        <motion.div className="w-full h-14 border-b-2 border-[#fce4bf] flex items-center" variants={ inputVariants }>
          <FaUnlockKeyhole className="ml-6 text-xl"/>
          <input type="password" className="ml-6 outline-none border-0 h-12 text-[12px] placeholder:text-[12px] placeholder:text-[#dd4470]" placeholder="Password" required name="password" value={ loginCred.password } onChange={ handleLoginInput }/>
        </motion.div>
      </motion.div>
      <div className="w-[180px] h-12 bg-[#fce4bf] mt-3 flex items-center justify-center rounded-[25px] hover:w-[200px] hover:cursor-pointer hover:bg-[#dd4470] transition-all duration-300" onClick={ loginBtn }>
        <span className="text-black font-bold text-[12px]">Login</span>
      </div>
      <div className="w-full h-12 text-[12px] flex items-center justify-center tablet:mt-16 laptop:mt-0 desktop:mt-16">
        <p>Dont have an account ? <span className="font-bold text-[#dd4470] pb-2 cursor-pointer hover:border-b-2 border-b-[#dd4470] transition-all duration-300" onClick={ ()=>{ props.setLoginActive(false); props.setAccountActive(true) } }>Create One</span></p>
      </div>
    </motion.div>
  )
}

export default Login
