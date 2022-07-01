// import librairies
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import actions
import { likePost, deletePost, approvePost } from "../../../actions/posts";
// import styles
import "./Post.scss";

const svgVariants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 0,
    transition: { duration: 1 },
  },
};

const pathVariants = {
  hidden: {
    opactiy: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.admin === true;
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
  // handling like button
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? ( // checking user Id for one like per person
        <>
          <ion-icon name="water" id="waterdrop-icon"></ion-icon>
          {likes.length > 2 ? (
            <p className="content-text">
              You and {`${likes.length - 1}`} others
            </p>
          ) : (
            <p className="content-text">
              {`${likes.length} Drop${likes.length > 1 ? "s" : ""}`}
            </p>
          )}
        </>
      ) : (
        <>
          <ion-icon name="water-outline" id="waterdrop-icon"></ion-icon>
          <p className="content-text">{likes.length}</p>
          {likes.length === 1 ? (
            <p className="content-text like">Drop</p>
          ) : (
            <p className="content-text">Drops</p>
          )}
        </>
      );
    }

    return (
      <>
        <ion-icon name="water-outline" id="waterdrop-icon"></ion-icon>
        &nbsp;<p className="content-text">Drop</p>
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, navigate));

    navigate(`/posts/${post._id}`);
  };

  // JSX code
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header__logo">
          <img
            src={
              post.selectedFile || "https://piotr.rzadkowolski.dev/noimage.png"
            }
            alt={post.title}
          />
          <motion.svg
            viewBox="0 0 100 100"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="50"
              stroke="#217a80"
              strokeWidth="8"
              fill="transparent"
              variants={pathVariants}
            />
          </motion.svg>
        </div>
        <div className="card-header__text">
          <div className="card-header__text-title">
            <h3 className="title">{post.title}</h3>
          </div>
          <div className="card-header__text-location">
            <p className="location-text">{post.city}</p>
          </div>
        </div>
      </div>
      <div className="card-main">
        <div className="card-main__text" onClick={openPost}>
          <p className="content-text">
            {post.message.split(" ").slice(0, 32).join(" ")}...
          </p>
        </div>
        <div className="card-main__hashtag">
          <p className="hashtag-text">{post.tags.map((tag) => `#${tag} `)}</p>
        </div>
        <div className="card-main__actions">
          <div
            className="card-main__actions-like"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </div>
          {isAdmin && (
            <div className="card-main__actions-delete">
              <ion-icon
                name="trash-outline"
                id="delete-icon"
                onClick={() => dispatch(deletePost(post._id))}
              ></ion-icon>
              <span className="content-text">/</span>
              <ion-icon
                name="create-outline"
                id="edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
              ></ion-icon>
              <span className="content-text">/</span>
              <ion-icon
                name="checkmark-outline"
                id="approve-icon"
                onClick={() => dispatch(approvePost(post._id))}
              ></ion-icon>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
