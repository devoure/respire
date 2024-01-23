import { Routes, Route } from "react-router-dom"

import PredictionSuccess from "./pages/PredictionSuccess.jsx"
import NotFound from "./pages/NotFound.jsx"
import Root from "./pages/Root.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Success from "./pages/Success.jsx"

import AuthProvider from "./contexts/AuthContext.jsx"
import PrivateRoutes from "./utils/PrivateRoutes.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path = "/" >
            <Route path = "" element = { <Root /> } />
            <Route path = "Success" element = { <Success /> } />
          </Route>

          <Route element={ <PrivateRoutes /> }>
            <Route element={ <Dashboard /> } path="/daktariml" />
            <Route element={ <PredictionSuccess /> } path="/pred-success" />
          </Route>
          <Route element= { <NotFound /> } path = "*" />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
