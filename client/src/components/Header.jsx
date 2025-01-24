import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation.pathname;
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);
  const [searchTerm, setSearchTerm] = useState('  ')
  //console.log(searchTerm)

  const handleSignout = async () =>{
      try {
          const res = await fetch("/api/user/signout",{
            method:'POST',
          })
          const data = await res.json();
          if(!res.ok){
            console.log(data.message)
          }else{
            dispatch(signoutSuccess())
          }
      } catch (error) {
        console.log(error.message)
      }
    }

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const searchTermFromUrl = urlParams.get('searchTerm')

      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
      }
    }, [location.search])

    const handleSubmit = async(e) => {
          e.preventDefault()

          const urlParams = new URLSearchParams(location.search)
          urlParams.set('searchTerm', searchTerm)
          const searchQuery = urlParams.toString()
          navigate(`/search?${searchQuery}`)
    }

  
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg ml-5">
          WebDev{" "}
        </span>{" "}
        Chronicles
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Seach..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-5 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" className="mr-5" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.userName}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.emailId}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="mr-5" gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
