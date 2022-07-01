import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, approvePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../LoadingBar/LoadingBar";
import "./Posts.scss";

const PostsAdmin = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.admin === true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!posts.length && !isLoading)
    return (
      <div className="spot_section">
        <p className="head-text">No posts</p>
      </div>
    );

  return isLoading ? (
    <div className="main_section">
      <LoadingBar />
    </div>
  ) : (
    isAdmin && (
      <div className="main_section-admin">
        {posts.map(
          (post) =>
            post.approved === false && (
              <div className="admin__post" key={post._id}>
                <div className="admin__post-image">
                  <img
                    src={post.selectedFile}
                    alt={post.title}
                    onClick={() => navigate(`/posts/${post._id}`)}
                  />
                </div>
                <div className="admin__post-body">
                  <div className="admin__post-title">
                    <h3 className="bold-text">{post.title}</h3>
                  </div>
                  <div className="admin__post-message">
                    <p>{post.message.split(" ").slice(0, 32).join(" ")}...</p>
                  </div>
                </div>
                <div className="admin__post-actions">
                  <div>
                    <ion-icon
                      name="checkmark-outline"
                      id="approve-icon"
                      onClick={() => dispatch(approvePost(post._id))}
                    ></ion-icon>
                  </div>
                  <div>
                    <ion-icon
                      name="create-outline"
                      id="approve-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentId(post._id);
                      }}
                    ></ion-icon>
                  </div>
                  <div>
                    <ion-icon
                      name="trash-outline"
                      id="approve-icon"
                      onClick={() => dispatch(deletePost(post._id))}
                    ></ion-icon>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    )
  );
};

export default PostsAdmin;
