import React from "react";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-lg text-gray-600 text-justify leading-relaxed tracking-wide">
        At WebDev Chronicles, we bring you curated MERN project ideas,
        step-by-step guides, and best practices to help you level up your
        portfolio. Whether you're debugging your first CRUD app or deploying a
        production-ready app, these projects are designed to enhance your skills
        and boost your confidence as a full-stack developer.
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
