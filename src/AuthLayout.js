import { Route, Routes } from "react-router-dom"
import Login from "./Login"




const AuthLayout = () => {
  return (
  <Routes>
    <Route path="/" element={<Login />}  />
  </Routes>
  )
}

export default AuthLayout