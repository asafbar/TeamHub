import { useDispatch, useSelector } from "react-redux"
import AppRouter from "./routes/AppRouter"
import type { AppDispatch, RootState } from "./store/store"
import { useEffect } from "react"
import { loadCurrentUserAsync } from "./features/auth/store/authSlice"


function App() {

  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState)=> state.auth.user)

  useEffect(() => {
    if (token) {
      dispatch(loadCurrentUserAsync())
    }
  }, [dispatch, token])

useEffect(()=>{
  if(user?.theme) {
    document.documentElement.dataset.theme = user.theme
  } else if(!token) {
    document.documentElement.dataset.theme = "light"
  }
}, [user?.theme, token])

  return <AppRouter />
}

export default App
