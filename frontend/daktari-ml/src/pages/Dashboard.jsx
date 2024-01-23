import Header from "../components/Header.jsx"
import Predictions from "../components/Predictions.jsx"
import Profile from "../components/Profile.jsx"
import AddPrediction from "../components/AddPrediction.jsx"
import Prediction from "../components/Prediction.jsx"

import { AuthContext } from "../contexts/AuthContext.jsx"
import { useState, useRef, useEffect, useContext } from "react"

function Dashboard() {
  const [profileActive, setProfileActive] = useState(false)
  const [selected, setSelected] = useState(false)
  const [predictionActive, setPredictionActive] = useState(false)
  const [addPrediction, setAddPrediction] = useState(false)
  let { user } = useContext(AuthContext)
  const page = useRef()

  const [predictions, setPredictions] = useState()
  const [selectedPreds, setSelectedPreds] = useState()
  let getPredictions = async (id)=> {
    let res = await fetch(`http://127.0.0.1:8000/api/model/v1/predictions/${id}/`) 
    let data = await res.json()
    if ( res.status === 200 ){
      setPredictions(data)
      setSelectedPreds(data)
    }
  }
  useEffect(()=>{
    getPredictions(user.user_id)
  }, [])
  return (
    <div className="w-screen h-screen flex flex-col laptop:flex-row relative min-w-[375px] min-h-[667px] laptop:min-h-max" ref={ page }>
      <Profile profileActive={ profileActive } setProfileActive={ setProfileActive }/>
      <Prediction selected={ selected } setPredictionActive={ setPredictionActive } predictionActive={ predictionActive }/>
      <div className="flex h-full w-full laptop:w-[70%] flex-col justify-between">
        <Header setProfileActive={ setProfileActive } setAddPrediction={ setAddPrediction } setSelectedPreds={ setSelectedPreds } predictions={ predictions }/>
        <Predictions setSelected={ setSelected } setPredictionActive={ setPredictionActive } page={ page } predictions={ predictions } setSelectedPreds={ setSelectedPreds } selectedPreds={ selectedPreds }/>
      </div>
      <AddPrediction setAddPrediction={ setAddPrediction } addPrediction={ addPrediction }/>
    </div>
  )
}

export default Dashboard
