import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import notFoundGif from '../assets/404.gif'

function NotFound() {
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate("/")
    }, 5000)
  }, [])
  return (
    <div className="flex flex-col w-full h-[80vh] min-w-[375px] min-h-[500px] items-center justify-center">
      <div className="font-lato flex  flex-col items-center justify-center w-full h-[40%]">
        <span className="font-bold text-6xl">404</span>
        <span className="font-bold text-xl p-2" >Sorry, either you mistyped the url or we deleted that page, but lets agree to blame this on you</span>
      </div>
      <div className="w-full h-[60%] flex items-center justify-center">
        <img src={ notFoundGif } className="w-[340px] h-[240px]"/>
      </div>
    </div>
  )
}

export default NotFound
