import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext.jsx"
import Bkg from "../assets/daktariml2.jpg"
import logo from "../assets/daktarimlogo.svg"
import { FaSearch } from "react-icons/fa"
import headerImg from "../assets/doctoradd.svg"
import { IoMdAdd } from "react-icons/io"
import { useState } from "react"
function Header(props) {
  let { userCred, userProfile, hostUrl } = useContext(AuthContext)
  const [query, setQuery] = useState("")

  function searchPreds(arr, query) {
    return arr.filter((el) => el.patient_id.includes(query))
  }

  function search(e){
    setQuery(e.target.value)
    let res = searchPreds(props.predictions, query)
    props.setSelectedPreds(res)
  }
  return (
    <div className="w-full min-w-[375px] laptop: h-[55%] min-h-[380px] bg-transparent rounded-b-[30px] relative overflow-hidden font-poppins select-none flex flex-col items-center justify-evenly">
      <div className="w-full h-max flex flex-col items-center">
        <div className="absolute inset-0 z-[-5] bg-black">
          <img src={ Bkg } className="w-full h-full opacity-15 object-cover"/>
        </div>
        <div className="w-full h-20 flex items-center justify-evenly laptop:justify-between laptop:hidden">
          <div className="h-12 w-12 laptop:hidden rounded-full bg-white overflow-hidden cursor-pointer hover:border-2 transition-all duration-300" onClick={ ()=>{ props.setProfileActive(true) } }>
            <img src={ userProfile && hostUrl + userProfile.photo } className="w-full h-full object-cover"/>
          </div>
          <div className="h-12 w-12 hidden laptop:block rounded-full bg-white overflow-hidden laptop:h-16 laptop:w-16">
            <img src={ userProfile && hostUrl + userProfile.photo } className="w-full h-full object-cover"/>
          </div>

          <div className="h-12 w-72 flex items-center">
            <span className="text-[18px] text-[#fce4bf] p-2">Hi there, Dr. { userCred && userCred.last_name }</span>
          </div>

          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src={ logo } className="h-12 w-12 object-cover" />
          </div>
        </div>

        <div className="hidden w-full laptop:flex justify-between">
          <div className="h-16 w-[20%] rounded-full overflow-hidden flex justify-start items-start ml-2">
            <img src={ logo } className="h-16 w-16 object-cover" />
          </div>
          <div className="flex w-[90%] justify-end mr-2 items-center">
            <div className="w-96 h-12 rounded-[30px] border-none bg-[#fce4bf]/10 flex items-center justify-evenly">
              <input type="text" className="h-12 w-[80%] bg-transparent text-[12px] font-bold text-white pl-5 outline-none" placeholder="Search for predictions by patient id" value={ query } onChange={ search }/>
              <FaSearch className="text-2xl text-[#fce4bf] cursor-pointer"/>
            </div>
          </div>
        </div>
        <div className="w-96 h-12 rounded-[30px] border-none bg-[#fce4bf]/10 flex items-center justify-evenly laptop:hidden">
          <input type="text" className="h-12 w-[80%] bg-transparent text-[12px] font-bold text-white pl-5 outline-none" placeholder="Search for predictions by patient id" value={ query } onChange={ search }/>
          <FaSearch className="text-2xl text-[#fce4bf] cursor-pointer"/>
        </div>
      </div>

      <div className="w-[320px] h-[220px] relative laptop:w-[500px] laptop:h-[250px] ">
        <img src={ headerImg }  className="w-full h-full object-none object-left laptop:object-cover laptop:w-[280px] laptop:h-[250px]"/>
        <div className="absolute right-0 top-0 w-40 h-12 flex items-center text-[19px] font-extrabold text-[#fce4bf]">
          <span>daktari.ml</span>
        </div>
        <p className="absolute w-40 h-44 laptop:w-[200px] top-12 right-0 font-extrabold text-[26px] text-[#dd4470]">Try our prediction model now</p>
        <div className="absolute w-12 h-12 bg-[#fce4bf] rounded-full top-[170px] right-0 flex items-center justify-center hover:w-14 hover:h-14 hover:bg-[#dd4470] group cursor-pointer transition-all duration-300">
          <IoMdAdd className="text-3xl text-[#dd4470] group-hover:text-white transition-all duration-300" onClick={ ()=>{props.setAddPrediction(true)} }/>
        </div>
      </div>
    </div>
  )
}

export default Header
