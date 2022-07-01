import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Post from "./Post/Post";
import LoadingBar from "../LoadingBar/LoadingBar";
import "./Posts.scss";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading)
    return (
      <div className="spot_section">
        <p className="head-text">No posts</p>
      </div>
    );

  return isLoading ? (
    <motion.div
      animate={{
        y: [100, 0],
      }}
      transition={{
        type: "tween",
        duration: 1,
      }}
      className="spot_section"
    >
      <LoadingBar />
    </motion.div>
  ) : (
    <div className="spot_section">
      {posts.map(
        (post) =>
          post.approved === true && (
            <div className="spots__post" key={post._id}>
              <Post post={post} setCurrentId={setCurrentId} />
            </div>
          )
      )}
    </div>
  );
};

export default Posts;
