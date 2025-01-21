import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about MERN Stack?</h2>
        <p className="text-gray-500 py-2">Checkout these resources </p>
        <Button gradientDuoTone="purpleToPink">
          <a
            href="https://www.geeksforgeeks.org/mern-stack-projects/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            MERN Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://www.prismetric.com/wp-content/uploads/2023/03/top-mern-stack-project-ideas-for-businesses.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;
