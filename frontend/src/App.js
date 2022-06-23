import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import getToken from "./api/getToken";
import Admin from "./Pages/Admin";
import TodaysTasks from "./Pages/TodaysTasks";

function App() {

  useEffect(() => {
    (async() => {
      await getToken()
    })()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<TodaysTasks />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
    
  );
}

export default App;
