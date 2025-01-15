import React from 'react'
import {Button} from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai"
import {app} from "../firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = getAuth(app)
    const handleGoogleClick = async () => {

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
          });

          try {
            const resulstFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: resulstFromGoogle.user.displayName,
                    emailId:resulstFromGoogle.user.email,
                    googlePhotoUrl: resulstFromGoogle.user.photoURL,

                }),
              });
                const data = await res.json();
                dispatch(signInSuccess(data))
                navigate('/')
          } catch (error) {
            console.log(error)
          }
          

    }
  return (
    <Button type='button' gradientDuoTone='purpleToPink' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-3'/>
        Continue with Google
    </Button>
  )
}

export default OAuth