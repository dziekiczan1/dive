// import libraries
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
// import action
import { commentPost } from "../../actions/posts";

// import styles

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("Comments");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComment("Comments...");
    setComments(newComments);

    commentsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <>
      <div className="details__card-comments-content">
        {comments.map((c, i) => (
          <p key={i} className="comment-line" ref={commentsRef}>
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </p>
        ))}
      </div>
      {user?.result?.name && (
        <div className="details__card-comments-input">
          <div className="details__card-comments-input-background">
            <h3 className="head-text-section">Write a comment</h3>
            <textarea
              className="comment-textarea"
              rows="6"
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              className="send-comment"
              disabled={!comment.length}
              onClick={handleComment}
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSection;
