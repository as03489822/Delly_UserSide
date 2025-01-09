import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ResetPassword } from "./ResetPassword"

function Login( ) {
    let navigate = useNavigate();
    let [reset , setReset] = useState(false)

    const [form, setForm] = useState({
        email:'',
        password:''
  })
  let[error , setError] = useState('');
  const handleOnChange = (e)=>{
      setForm((preValu)=>{
          return{...preValu, [e.target.name] : e.target.value}
      })
      setError('')
  }

//   const getGeoLocation = ()=> {
//     if (navigator.geolocation){
//         return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(async(position)=>{
//             try{
//                 const lon = position.coords.longitude;
//                 const lat = position.coords.latitude;
//                 let key ='pk.220d5182b32f6142756fdd32e9a9b643';
//                 console.log(lat , lon)
//                 const response =await fetch(`https://us1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${lon}&format=json`);
//                 const data = await response.json();
//                 resolve(data.display_name)
//             }catch(err){
//                 reject(err)

//             }
//         } , (error)=>{
//             reject(error.message)
//         })
//     });
//     }
//   }

  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
        let response = await axios.post('http://localhost:8080/user/auth/login' , {form});
        localStorage.setItem('token' , response.data.token)
        navigate('/home')
    }catch (err){
        setError(err.response.data.message)
    }
    }

    let navigateToSignup = ()=>{
        navigate('/signup')
    }

    return(
    <div className="mb-[130px] h-[70vh] flex flex-col justify-center items-center">
        {reset ? <div className=" absolute top-10 z-10 w-[30%] h-[70%] bg-white rounded-lg border-[2px] border-[#013D29] "><ResetPassword reset={reset}  setReset={setReset}/></div>:null}
        <h1 className="text-[24px] text-[#219653] outfit md:text-[40px] font-bold">Login</h1>
        <form onSubmit={handleLogin} className="w-[300px]" >
            <div className="flex gap-1  outfit flex-col mt-4" >
                <label className="" htmlFor="emails"><b>Email</b></label>
                <input id="emails" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" type="email" placeholder="email" onChange={handleOnChange} value={form.email} name="email" required />
                <p className="rounded-full mt-1 text-[14px] bg-[#fcd2d2] pl-2 text-red font-semibold">{error}</p>
            </div>
            <div className="flex outfit gap-1 flex-col mt-4 ">
                <label className="" htmlFor="passwords"><b>Password</b></label>
                <input id="passwords" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" type="Password" placeholder="password" onChange={handleOnChange} value={form.password} name="password" required />
                <p className="rounded-full mt-1 text-[14px] bg-[#fcd2d2] pl-2 text-red font-semibold">{error}</p>
            </div>
            <button type="submit" className="mt-4 bg-[#013D29] outfit text-white py-2 px-4 rounded-full">Log In</button>
        </form>
        {error ? 
          <p onClick={() => setReset(!reset)} className="cursor-pointer text-[#219653] font-bold h-[40px]">Reset Password</p>:null}
        <div className="my-5 outfit"><span className=" text-12px text-[gray]">Don&apos;t have an account?</span><span onClick={navigateToSignup} className=" ml-2 cursor-pointer underline font-bold">Sign Up</span></div>
    </div>
    )
}

export default Login