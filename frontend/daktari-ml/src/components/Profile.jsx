import profPic from "../assets/profpic.png"
import { IoClose } from "react-icons/io5"
import { FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FaHospital } from "react-icons/fa"
import { FaIdBadge } from "react-icons/fa6"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext.jsx"
function Profile(props) { 
  const isDesktop = useMediaQuery({minWidth : 1400})
  const isLaptop = useMediaQuery({ minWidth : 1024 })
  const isTablet = useMediaQuery({ minWidth : 640, minHeight:960 })
  const mainVariants = {
    hidden : { 
      x : isTablet ? "720px" : isLaptop ? "0" : isDesktop ? "" : "-375px",
    },
    visible : {
    x : "0px",
    transition: {
        delay: 0.3,
      }
  }
  }
  const inputVariants = {
    hidden:{
      x : isTablet ? "0" : isLaptop ? "0px" : isDesktop ? "" : -10,
      opacity: isTablet ? "720px" : isLaptop ? 1 : isDesktop ? "" : 0,
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
  let { userCred, userProfile, hostUrl, user, logOutUser } = useContext(AuthContext)
  return (
    <motion.div className="absolute laptop:static laptop:w-[30%] laptop:h-full inset-0 bg-white/50 z-10 backdrop-blur-[20px] flex items-center justify-center font-poppins" variants={ mainVariants } animate={ props.profileActive ? "visible" : "hidden" }>
      <div className="bg-white/60 w-[320px] h-[560px] rounded-3xl shadow-xl overflow-hidden relative">
        <div className="w-12 h-12 bg-white/70 rounded-full absolute right-2 top-2 hover:shadow-xl cursor-pointer flex items-center justify-center group hover:bg-[#dd4470] transition-all duration-300 laptop:hidden" onClick={ ()=>{ props.setProfileActive(false) } }>
          <IoClose className="text-3xl group-hover:text-white transition-all duration-300"/>
        </div>

        <div className="w-full h-[200px] flex items-center justify-center">
          <img src={ userProfile && hostUrl + userProfile.photo } className="w-[150px] h-[150px] object-cover rounded-full"/>
        </div>

        <motion.div className="w-full h-[250px] flex flex-col items-center" variants={ inputVariants } animate={ props.profileActive ? "visible" : "hidden" }>
          <motion.div className="w-[270px] h-14 border-b-2 border-[#fce4bf] flex items-center justify-evenly" variants={ inputVariants }>
            <FaUser className="text-xl ml-6"/>
            <span className="text-[12px] w-60 text-[#dd4470] font-bold"><span className="text-[14px] mr-2">Dr.</span>{ userCred && userCred.first_name + userCred.last_name }</span>
          </motion.div>

          <motion.div className="w-[270px] h-14 border-b-2 border-[#fce4bf] flex items-center justify-evenly" variants={ inputVariants }>
            <FaIdBadge className="text-xl ml-6"/>
            <span className="text-[12px] w-60 text-[#dd4470] font-bold">{ user && user.username }</span>
          </motion.div>

          <motion.div className="w-[270px] h-14 border-b-2 border-[#fce4bf] flex items-center justify-evenly" variants={ inputVariants }>
            <MdEmail className="text-xl ml-6"/>
            <span className="text-[12px] w-60 text-[#dd4470] font-bold">{ userCred && userCred.email }</span>
          </motion.div>

          <motion.div className="w-[270px] h-14 border-b-2 border-[#fce4bf] flex items-center justify-evenly" variants={ inputVariants }>
            <FaHospital className="text-xl ml-6"/>
            <span className="text-[12px] w-60 text-[#dd4470] font-bold">{ userProfile && userProfile.hospital }</span>
          </motion.div>

        </motion.div>

        <div className="w-full h-16 flex items-center justify-center">
          <span className="px-5 py-3 bg-[#dd4470] rounded-[20px] font-bold text-white hover:shadow-xl hover:px-8 cursor-pointer transition-all duration-300" onClick={ logOutUser }>Log Out</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
