import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()

  const {loading, error:errorMessage} = useSelector((store) => store.user)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are provided
    if ( !formData.emailId || !formData.password) {
      return dispatch(signInFailure("All fields are required."));
    }

    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-8">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg">
              WebDev{" "}
            </span>{" "}
            Chronicles
          </Link>
          <p className="text-base text-gray-800 mt-5 text-wrap text-left  dark:text-white">
            WebDev Chronicles is your go-to destination for stories, tutorials,
            and the latest innovations in web development. Join the WebDev Chronicles 
            community and stay ahead in the ever-evolving world of web development!
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email:" />

              <TextInput
                id="emailId"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password:" />

              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <Button type="submit" gradientDuoTone="purpleToBlue" disabled={loading}>
              {loading ? (
                <>
                <Spinner size="sm"/>
                <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex text-sm gap-2 mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
