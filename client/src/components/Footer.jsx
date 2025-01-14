import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-cyan-600">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg">
                WebDev{" "}
              </span>{" "}
              Chronicles
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="RESOURCES" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://medium.com/welldone-software/seo-for-developers-a-quick-overview-5b5b7ce34679"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SEO for Developers
                </Footer.Link>
                <Footer.Link
                  href="https://tripleten.com/blog/posts/10-software-development-blogs-worth-bookmarking"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Developer Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="DISCOVER" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://bloggingfordevs.com/javascript-blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  JavaScript Blogs
                </Footer.Link>
                <Footer.Link
                  href="https://bloggingfordevs.com/node-blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Node.js Blogs
                </Footer.Link>
                <Footer.Link
                  href="https://bloggingfordevs.com/react-blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React.js Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="WebDev Chronicles"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon
              href="https://www.linkedin.com/in/pooja-kumari-908465126/"
              icon={BsLinkedin}
            />
            <Footer.Icon href="https://github.com/Pooja675" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
