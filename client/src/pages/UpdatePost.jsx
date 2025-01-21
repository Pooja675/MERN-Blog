import React, { useEffect, useState } from "react";
import { Alert, Button, Select, Textarea, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const { currentUser } = useSelector((store) => store.user);

  const navigate = useNavigate();

  //console.log(formData);

  // const fetchPost = async () => {
  //   try {
  //     const res = await fetch(`/api/post/getposts?postId=${postId}`);
  //     const data = await res.json();

  //     if (!res.ok) {
  //       console.log(data.message);
  //       setPublishError(error.message);
  //       return;
  //     }
  //     if (res.ok) {
  //       setPublishError(null);
  //       setFormData(data.posts[0]);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(error.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      console.log("Received postId:", postId);
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { title, content } = formData;
    // if (!title || !content) {
    //   setPublishError("Please provide all required fields: title and content.");
    //   return;
    // }

    // if (!_id) {
    //   setPublishError("Post ID is missing. Cannot update the post.");
    //   return;
    // }

    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong.");
    }
  };

  return (
    <div className="p-3 max-w-3xl  mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text "
            value={formData.title}
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
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
            id="imageUrl"
            type="text"
            placeholder="PhotoUrl"
            //defaultValue={currentUser.profilePicture}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />
        </div>

        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          id="content"
          value={formData.content}
          placeholder="Write Something...."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        {/* <Textarea
          id="content"
          placeholder="Description"
          required
          rows={4}
          className="h-72 mb-6"
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          value={formData.content}
        /> */}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update Post
        </Button>
        {publishError && (
          <Alert className="mt-3" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
