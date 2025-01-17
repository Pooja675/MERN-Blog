import React from "react";
import { Button, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl  mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text "
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React.js</option>
            <option value="next">Next.js</option>
            <option value="node">Node.js</option>
            <option value="mongodb">MongoDB</option>
          </Select>
        </div>
        <div className="items-center border-4 border-teal-500 border-dotted p-3">
          <TextInput
            id="profilePicture"
            type="text"
            placeholder="PhotoUrl"
            //defaultValue={currentUser.profilePicture}
          />
        </div>
        <ReactQuill theme="snow" placeholder="Write Something...." className="h-72 mb-12" required/>
        <Button type="submit" gradientDuoTone="purpleToPink">
            Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
