import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8">
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />

              <TextInput
                id="username"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <Label value="Your email" />

              <TextInput id="email" type="text" placeholder="Email" />
            </div>
            <div>
              <Label value="Your password" />

              <TextInput id="password" type="password" placeholder="Password" />
            </div>
            
            <Button type="submit" gradientDuoTone="purpleToBlue">Submit</Button>
          </form>
          <div className="flex text-sm gap-2 mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
