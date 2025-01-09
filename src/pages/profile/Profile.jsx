import { useEffect, useState } from "react"
import axios  from "axios"
import {useNavigate} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { EditForm } from "./EditForm"
import { UserDetails } from "./UserDetails"
import { FileUpload } from "./FileUpload"

// import { useDispatch } from "react-redux"

export const Profile = () => {
  let navigate = useNavigate();
  // let dispatch = useDispatch();
  const token = localStorage.getItem('token');
  let [upload , setUpload] = useState(false);
  let [edit , setEdit] = useState(false);
  let [form , setForm] = useState({
    id:'',
    username: '',
    email: '',
    profileImage: null,
    password: '',
    confirmPassword: ''
  })
  if(!token){
    navigate('/')
  }
  // to get user  information
  useEffect(()=>{
    let getUser =  async ()=>{
      try{
        let response = await axios.get('http://localhost:8080/user/profile', {
          headers:{
            authorization:`Bearer ${token}`
          }
        })
        setForm((preVal)=>(
          {
            ...preVal ,
            id: response.data._id, 
            username: response.data.username, 
            email: response.data.email,
            profileImage: response.data.profileImage,
          }
        ))
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  },[token, edit, upload ])

  let handleLogout = () => {
    // dispatch({type: 'RESET FAVOURITE'})
    localStorage.removeItem('token')
    navigate('/home');
  }


  return (
    <div className="   h-[100vh] flex justify-center  items-center">
      <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />
      <div className=" relative w-[900px]  h-[80%]  rounded-lg  overflow-hidden border border-[#013D29]">
        <div className="px-10 flex justify-between items-end h-[100px] bg-[#013D29] outfit ">
          <h1 className="text-[60px] text-white font-semibold">Profile</h1>
          <div className="flex gap-10">
          <p onClick={handleLogout} className="cursor-pointer text-[#219653] font-bold h-[40px]">LogOut</p>
          </div>
        </div>

        <FileUpload upload={upload}  form={form} setUpload={setUpload} token={token}   />
        {edit? 
        <EditForm setForm={setForm}  form={form} setEdit={setEdit} edit={edit} /> 
        : 
        <UserDetails form={form} setEdit={setEdit} edit={edit} />
        }
      </div>
    </div>
  )
}
