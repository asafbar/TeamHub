import { useDispatch, useSelector } from "react-redux"
import AppRouter from "./routes/AppRouter"
import type { AppDispatch, RootState } from "./store/store"
import { useEffect } from "react"
import { loadCurrentUserAsync } from "./features/auth/store/authSlice"


function App() {

  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(loadCurrentUserAsync())
    }
  }, [dispatch, token])

  return <AppRouter />
}

export default App
