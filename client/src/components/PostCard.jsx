import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[300px] transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.imageUrl}
          alt="post cover"
          className="h-[190px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-2 flex flex-col gap-1">
        <p className="text-base font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-xs">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500
           text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-1 rounded-md !rounded-tl-none m-2 text-sm"
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
