import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((store) => store.user);
  const [imageFile, setImageFile] = useState(null);
  // const [imageFileUrl, setImageFileUrl] = useState(null);
  // const filePickerRef = useRef();
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     setImageFileUrl(URL.createObjectURL(file));
  //   }
  // };

  // //console.log(imageFile, imageFileUrl);

  // useEffect(() => {
  //   if(imageFile) {
  //     uploadImage()
  //   }
  // }, [imageFile])

  // const uploadImage = async () => {
  //   console.log("Uploading image.....")
  // }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.userName}
        />
        <TextInput
          id="emailId"
          type="email"
          placeholder="email"
          defaultValue={currentUser.emailId}
        />
        <TextInput id="password" type="text" placeholder="password" />
        <TextInput
          id="profilePicture"
          type="text"
          placeholder="photoUrl"
          defaultValue={currentUser.profilePicture}
        />
        <Button tupe="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between text-red-500 mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
