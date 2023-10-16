import AdminLayout from "./AdminLayout"
import AuthLayout from "./AuthLayout"


const App = () => {
  const auth = true
  return (
    <>
    {
      auth ? <AdminLayout /> : <AuthLayout />
    }
    </>
  )
}

export default App