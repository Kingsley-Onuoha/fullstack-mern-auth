import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";


const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])
  
  const handleFileUpload = async (image) => {
    const storage = getStorage(app)

    const fileName = new Date().getTime + image.name

    const storageRef = ref(storage, fileName)
    
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           setImagePercent(Math.round(progress));
      },
      (error) => {
          setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    )
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePhoto}
          alt="profile"
          className="h-24 w-24 mt-1 self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />
        
        <p className="text-sm self-center">
          {imageError ? <span className="text-red-700">Error uploading image(file size must be less than 2MB)</span>: (imagePercent > 0 && imagePercent < 100) ? (<span className="text-slate-700">{ `uploading ${imagePercent}"%"`}</span>):(imagePercent === 100)? (<span className="text-green-700">Image upload successful</span>):""
          }
        </p>

        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
          defaultValue={currentUser.username}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          defaultValue={currentUser.email}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
