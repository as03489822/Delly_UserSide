import { Route ,Routes} from "react-router-dom";
import { Home } from './pages/home/Home';
import { Profile } from "./pages/profile/Profile";
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Favorite } from "./components/Favorite";
import { Cart } from "./components/Cart";
import './i18n'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
