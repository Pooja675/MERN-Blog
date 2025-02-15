import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {FaCheck, FaTimes} from "react-icons/fa"

const DashComments = () => {
  const { currentUser } = useSelector((store) => store.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [commentIdToDelete, setCommentIdToDelete] = useState(' ')
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
         "/api/comment/getcomments"
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if(data.comments.length > 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async() => {
    const startIndex = comments.length;

    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
      const data = await res.json()
      if(res.ok){
        setComments((prev) => [...prev, ...data.comments])
        if(data.comments.length < 9){
          setShowMore(false)
        }
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDeleteComment = async() => {
    setShowModal(false)
     try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
        method:'DELETE',
      })
      const data = await res.json()

      if(res.ok){
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete))
        setShowModal(false)
      }else{
        console.log(data.message)
      }
      
     } catch (error) {
      console.log(error.message)
     }
  }

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
     scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark: dark:scrollbar-thumb-slate-300"
    >
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Update</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                   
                     {comment.content}
                  </Table.Cell>
                  <Table.Cell>
                    
                      {comment.NumberOfLikes}
                
                  </Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id)

                    }}>
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {
            showMore && (
              <button className="w-full text-teal-500 self-center text-sm py-7" onClick={handleShowMore}>
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no comments yet!!</p>
      )}

      <Modal
              show={showModal}
              size="md"
              onClose={() => setShowModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this comment?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeleteComment}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
    </div>
  );
};

export default DashComments;
