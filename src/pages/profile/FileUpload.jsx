import defaultPic  from '../../assets/default user/defaultUser.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types'

export const FileUpload = ({token , setUpload , upload ,form }) => {
    let handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
      
        const formData = new FormData();
        formData.append("profileImage", file);
        try {
          let response = await axios.post(
            "http://localhost:8080/user/profile/uploadImage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${token}`
              },
            }
          );
          setUpload(!upload)
          toast.success(`${response.data.message}`);
        } catch (err) {
          console.log(err)
          toast.error("Failed to upload file.");
        }
      };

  return (
    <div  className="m-10 relative w-[250px] h-[250px]  rounded-full">
    <img className="h-full w-full rounded-full object-cover" src={form.profileImage?`http://localhost:8080/${form.profileImage.path}` :defaultPic} alt="user" />
    <label
      htmlFor="file-input"
      className="absolute right-[22px] bottom-[22px] hover:bg-[#013D29] text-[#219653] bg-white h-[30px] w-[30px] border rounded-full cursor-pointer flex justify-center items-center"
    >
      <i className="fa-regular fa-pen-to-square"></i>
    </label>
    <input
    id="file-input"
    type="file"
    className="hidden"
    onChange={handleFileUpload}
    />
  </div>
  )
}


FileUpload.propTypes = {
    token : PropTypes.string.isRequired,
    setUpload: PropTypes.func.isRequired,
    upload: PropTypes.bool.isRequired,
    form: PropTypes.shape({
        profileImage:PropTypes.shape({
            path: PropTypes.string.isRequired
        })
    }).isRequired
}