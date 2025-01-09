import { useState } from "react";
import axios  from "axios";
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

export const EditForm = ({setForm , form, setEdit, edit}) => {
    let [pass , setPass] = useState(true);

    let handleOnChange = (e) => {
        let {name , value} = e.target;
        setForm((preVal) => (
          {...preVal , [name]: value}
        ))
    }   

    let handleUpdate = async (e) =>{
        e.preventDefault()
        try{
          let response= await axios.put('http://localhost:8080/user/profile/edit',{form});
          toast.success(`${response.data.message}`)
          setEdit(!edit)
        }catch(err){
          toast.error(`${err.response.data.message}`)
        }
      }

  return (
    <form onSubmit={handleUpdate} className="px-10  flex flex-col  ">
            <div className="flex  gap-3 flex-wrap">
              <div className="flex gap-5"> 
                <label htmlFor="name" className="flex items-center"><b>Username</b></label>
                <input onChange={handleOnChange} type="text" name="username" id="name" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.username} required />
              </div>

              <div className="flex gap-5"> 
                <label htmlFor="eml" className="flex items-center"><b>Email</b></label>
                <input onChange={handleOnChange} type="email" name="email" id="eml" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.email} required />
              </div>

              <div className="relative flex gap-5"> 
                <label htmlFor="pass" className="flex items-center"><b>Pasword</b></label>
                <input onChange={handleOnChange} type={pass?'password':'text'} name="password" id="pass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.password} required />
                <p  className="absolute right-3 top-2 cursor-pointer font-semibold" onClick={()=>setPass(!pass)}> {pass?'Show':'Hide'} </p>
              </div>

              <div className="relative flex gap-5"> 
                <label htmlFor="Cpass" className="flex items-center"><b>Confirm Pasword</b></label>
                <input onChange={handleOnChange} type={pass?'password':'text'} name="confirmPassword" id="Cpass" className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg" value={form.confirmPassword} required />
                <p  className="absolute right-3 top-2 cursor-pointer font-semibold" onClick={()=> setPass(!pass)}> {pass?'Show':'Hide'} </p>
              </div>

              <span className='w-full md:w-[10%] flex items-center jusify-center'>
                <button type="submit" className='bg-[#013D29] w-full rounded-full text-white outfit py-1'>update</button>
              </span>
            </div>
         </form> 
  )
}


EditForm.propTypes = {
  setForm: PropTypes.func.isRequired,
  form: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};
