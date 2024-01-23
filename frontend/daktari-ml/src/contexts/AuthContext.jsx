import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

export default function AuthProvider(props){
  let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
  let [user, setUser] = useState(()=> localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)
  let [loading, setLoading] = useState(true)


  let navigate = useNavigate()

  let [userCred, setUserCred] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null)

  let [userProfile, setUserProfile] = useState(()=> localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null)

  let getUserData = async(id) => {
    let userCredRes = await fetch(`http://127.0.0.1:8000/api/accounts/v1/users/${id}/`)
    let userData = await userCredRes.json()
    if (userCredRes.status === 200){
      localStorage.setItem('userData', JSON.stringify(userData))
      setUserCred(userData)
    }

    let res = await fetch(`http://127.0.0.1:8000/api/accounts/v1/profiles/${id}/`)
    let data = await res.json()
    if (res.status === 200){
      localStorage.setItem('userProfile', JSON.stringify(data))
      setUserProfile(data)
    }
  }

  let loginUser = async (e, loginCred) => {
    e.preventDefault()

    let response = await fetch('http://127.0.0.1:8000/api/accounts/v1/token/', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(loginCred)
    })

    let data = await response.json()
    if (response.status === 200){
      setAuthToken(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authToken', JSON.stringify(data))
      getUserData(jwtDecode(data.access).user_id)
      navigate("/daktariml")
    }else{
      alert("Something went wrong")
    }
  }

  let logOutUser = () =>{
    setAuthToken(null)
    setUser(null)
    setUserProfile(null)
    setUserCred(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userCred')
    localStorage.removeItem('userProfile')
    navigate("/")
  }

  let createAccount = async (e, accountCred) => {
    e.preventDefault()

    let response = await fetch('http://127.0.0.1:8000/api/accounts/v1/user/add', {
      method:'POST',
      //headers:{
      //  'Content-Type':'application/json'
      //},
      body: accountCred
    })

    let data = await response.json()
    if (data === "OK"){
      navigate("/success")
    }else{
      alert("Something went wrong, try again !")
    }
  }

  let updateToken = async ()=> {
    let response = await fetch('http://127.0.0.1:8000/api/accounts/v1/token/refresh/', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authToken?.refresh})
    })

    let data = await response.json()

    if (response.status === 200){
      setAuthToken(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authToken', JSON.stringify(data))
    }else{
      logOutUser()
    }

    if (loading){
      setLoading(false)
    }
  }

  let contextData = {
    user: user,
    userCred: userCred,
    userProfile: userProfile,
    getUserData: getUserData,
    authToken: authToken,
    loginUser: loginUser,
    logOutUser: logOutUser,
    createAccount: createAccount,
    hostUrl: 'http://localhost:8000'
  }

  useEffect(()=>{
    if(loading){
      updateToken()
    }

    let fourMins = 1000 * 60 * 4
    let interval = setInterval(()=>{
      if(authToken){
        updateToken()
      }
    }, fourMins)
    return ()=> clearInterval(interval)
  }, [authToken, loading])

  return(
    <AuthContext.Provider value = { contextData } >
      { loading ? null : props.children }
    </AuthContext.Provider>
  )
}
