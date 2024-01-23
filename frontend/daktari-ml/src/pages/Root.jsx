import bkg from "../assets/daktariml2.jpg"
import logo from "../assets/daktarimlogo.svg"
import Login from "../components/Login.jsx"
import CreateAccount from "../components/CreateAccount.jsx"
import { useState } from "react"
function Root() {
  const [accountActive, setAccountActive] = useState(false)
  const [loginActive, setLoginActive] = useState(false)
  return (
    <div className="w-screen h-screen relative font-poppins select-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-[-5] bg-black">
        <img src={ bkg } className="min-w-[720px] h-full laptop:w-full object-cover object-right laptop:object-center opacity-10"/>
      </div>

      <div className="w-screen h-screen min-h-[667px] min-w-[375px] bg-transparent">
        <div className="w-full h-full flex flex-col justify-between laptop:items-end laptop:justify-normal">
          <div className="w-full h-20 tablet:h-24 flex items-center pl-4 laptop:h-[70px] desktop:h-28 desktop:h-28">
            <img src={logo}  className="h-14 w-14 tablet:h-20 tablet:w-20 laptop:h-16 laptop:w-16 desktop:h-20 desktop:w-20"/>
          </div>

          <div className="w-full h-[540px] tablet:h-[840px] laptop:w-[500px] laptop:h-[540px] desktop:h-[840px] flex  flex-col items-center overflow-hidden relative flex-end">
            <div className="w-[320px] h-[300px] desktop:w-[400px] desktop:h-[400px]">
              <div className="w-full h-16 flex items-end">
                <span className="font-extrabold text-[23px] text-[#fce4bf] p-2 border-b-2 border-[#dd4470]">daktari.ml</span>
              </div>
              <p className="text-white text-[24px] leading-relaxed tracking-wide">a medical solution that uses machine learning to shape a brighter future for respiratory health.</p>
            </div>
            <CreateAccount setAccountActive={setAccountActive} accountActive={accountActive} setLoginActive={ setLoginActive }/>
            <Login setLoginActive={setLoginActive} loginActive={loginActive} accountActive={accountActive} setAccountActive={ setAccountActive }/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Root
