import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Leaderboard from "./Pages/Leaderboard"
import ClaimHistory from "./Pages/ClaimHistory"
import Layout from "./Components/Layout"

function App() {

  return (
    <div className="min-h-screen bg-gray-400 w-full">

      <Routes>

        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/claim-history" element={<ClaimHistory />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App
