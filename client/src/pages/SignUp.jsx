import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessge] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are provided
    if (!formData.userName || !formData.emailId || !formData.password) {
      return setErrorMessge("All fields are required.");
    }

    try {
      setLoading(true);
      setErrorMessge(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessge(data.message);
      }

      setLoading(false);
      if(res.ok) {
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessge(error.message);
      setLoading(false);
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
          <p className="text-base text-gray-800 mt-5 text-wrap text-left">
            WebDev Chronicles is your go-to destination for stories, tutorials,
            and the latest innovations in web development. Whether you're a
            beginner looking to learn the basics or an experienced developer
            staying updated with cutting-edge technologies, this blog offers
            something for everyone. Join the WebDev Chronicles community and
            stay ahead in the ever-evolving world of web development!
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />

              <TextInput
                id="userName"
                type="text"
                placeholder="Username"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />

              <TextInput
                id="emailId"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />

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
                'Sign up'
              )}
            </Button>
          </form>
          <div className="flex text-sm gap-2 mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
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

export default SignUp;
