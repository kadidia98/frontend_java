import { useContext } from "react"
import AdminLayout from "./AdminLayout"
import AuthLayout from "./AuthLayout"
import AuthContext from "./context/AuthContext"


const App = () => {
  const {auth} = useContext(AuthContext) //  on récupère la valeur auth du contexte
  return (
    <>
    {
      auth ? <AdminLayout /> : <AuthLayout /> //  si auth est vrai, on affiche le layout admin, sinon le layout d'authentification
    }
    </>
  )
}

export default App