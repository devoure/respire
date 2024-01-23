import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext.jsx"


function PrivateRoutes(){
  const { user } = useContext(AuthContext)
  return(
    user ? <Outlet /> : <Navigate to="/" /> 
  )
}

export default PrivateRoutes
