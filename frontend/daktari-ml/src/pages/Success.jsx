import { TiTick } from "react-icons/ti"
import { Link } from "react-router-dom"

function Success() {
  return (
    <div className="w-screen h-screen flex items-start justify-center laptop:items-center mt-5">
      <div className="flex  flex-col shadow-2xl rounded-[1.8rem] min-w-[350px] min-h-[250px] w-[90%] h-[30%] tablet:w-[50%] laptop:w-[40%] laptop:h-[50%] desktop:w-[30%] items-center justify-center">

        <div className="w-[5rem] h-[5rem] rounded-full border border-[#220e0a] flex items-center justify-center text-green-700">
          <TiTick  className="text-7xl"/>
        </div>

        <div className="flex">
          <span className="tracking-normal leading-relaxed font-roboto text-5xl font-bold text-[#220e0a] whitespace-nowrap">Success.</span>
        </div>


        <div className="flex justify-center items-center font-roboto whitespace-nowrap p-2 text-lg text-[#dd4470] font-semibold mb-8">
          <span>Account created successfully <Link to={ '/' } className="text-[#220e0a] cursor-pointer hover:border-b-2 hover:border-b-green-700 p-2 transition duration-300">Log in</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Success
