import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingBar from "../LoadingBar/LoadingBar";
import { getPost, getPostsBySearch } from "../../actions/posts";
import "./PostDetails.scss";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;
  if (isLoading) {
    return (
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
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <div className="app__wrapper">
      <div className="details__card-background">
        {post.approved === false && (
          <div className="details__admin-approval">
            <p>Your diving spot is waiting for admin approval</p>
          </div>
        )}
        <div className="details__card-container">
          <div className="details__card-information">
            <div className="details__card-information-background">
              <div className="details__card-information-header">
                <div className="details__card-information-header-title">
                  <h3 className="head-text">{post.title}</h3>
                </div>
                <div className="details__card-information-header-tags">
                  <p className="hashtag-text-details">
                    {post.tags.map((tag) => `#${tag} `)}
                  </p>
                </div>
                <div className="details__card-information-header-info">
                  <hr className="seperate-line" />
                  <p className="info-text">Location: {post.city}</p>
                  <p className="info-text">Maximum Depth: {post.maxdepth}m</p>
                  <p className="info-text">Type of Spot: {post.typeofspot}</p>
                  <p className="info-text">Added by: {post.name}</p>
                  <p className="info-text">
                    Date: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <hr className="seperate-line" />
                </div>
              </div>
              <div className="details__card-information-body">
                <p className="post-text">{post.message}</p>
              </div>
            </div>
            <div className="details__card-information-image">
              <img
                src={
                  post.selectedFile ||
                  "https://piotr.rzadkowolski.dev/noimage.png"
                }
                alt={post.title}
              />
            </div>
          </div>
          {/* <div className="details__card-comments">
            <div className="details__card-comments-header">
              <h3 className="head-text-section">Comments</h3>
              <hr className="seperate-line" />
            </div>
            <div className="details__card-comments-body">
              <CommentSectionNew post={post} />
            </div>
          </div> */}
          <div className="details__card-similar">
            <div className="details__card-similar-header">
              <h3 className="head-text-section">You Might Also Like</h3>
              <hr className="seperate-line" />
            </div>
            <div className="details__card-similar-body">
              {recommendedPosts.length && (
                <div className="details__card-similar-content">
                  {recommendedPosts.map(
                    ({ title, message, selectedFile, _id }) => (
                      <div
                        style={{ cursor: "pointer" }}
                        className="details__card-card"
                        onClick={() => openPost(_id)}
                        key={_id}
                      >
                        <p className="bold-text">
                          <strong>{title}</strong>
                        </p>
                        <p className="post-text">
                          {message.substring(0, 400) + "..."}
                        </p>
                        <img
                          src={selectedFile}
                          alt={title}
                          className="details__card-similar-image"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
