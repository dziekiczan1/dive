import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PostsAdmin from "../Posts/PostsAdmin";
import Form from "../Form/Form";
import PaginateAdmin from "../Pagination/PaginationAdmin";
import { getContactMessage } from "../../actions/contact";
import "./Admin.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Admin = () => {
  const [currentId, setCurrentId] = useState(0);
  const query = useQuery();
  const dispatch = useDispatch();
  const page = query.get("page") || 1;
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.admin === true;

  useEffect(() => {
    dispatch(getContactMessage());
  }, [dispatch]);

  return (
    <>
      <div className="app__wrapper">
        {isAdmin ? (
          <>
            <Link to={`/admin/messages`}>
              <button className="admin">Admin Messages</button>
            </Link>
            <PostsAdmin setCurrentId={setCurrentId} />
            <div className="pagination">
              <PaginateAdmin page={page} />
            </div>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </>
        ) : (
          <div className="app__wrapper">
            <div className="app__flex">
              <div className="form__background form__header">
                <p className="bold-text">You are not an admin</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
