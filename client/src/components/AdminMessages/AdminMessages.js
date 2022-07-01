import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactMessage } from "../../actions/contact";
import LoadingBar from "../LoadingBar/LoadingBar";
import "./AdminMessages.scss";

const AdminMessages = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.admin === true;
  const dispatch = useDispatch();
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const toggling = () => setIsOpenMessage(!isOpenMessage);

  const { contact, isLoading } = useSelector((state) => state.contact);

  return (
    isAdmin && (
      <div className="app__wrapper">
        <h1 className="head-text">
          <span>Incoming</span> Messages
        </h1>
        {isLoading && (
          <div className="main_section">
            <LoadingBar />
          </div>
        )}
        {contact.length === 0 ? (
          <div className="spot_section">
            <p className="head-text">No messages</p>
          </div>
        ) : (
          contact.map((item) => (
            <div className="admin__post" key={item._id}>
              <div className="admin__post-body">
                <div className="admin__post-title">
                  <h3 className="bold-text">{item.title}</h3>
                </div>
                <div className="admin__post-message">
                  <p>
                    <strong>From:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Reply to:</strong> {item.email}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="admin__post-message">
                  <p>
                    <strong>Message:</strong>
                  </p>
                  <p>
                    {isOpenMessage
                      ? item.message.split(" ").splice(0, 20).join(" ")
                      : item.message}
                  </p>
                </div>
              </div>
              <div className="admin__post-actions">
                <div>
                  <ion-icon
                    name="trash-outline"
                    id="approve-icon"
                    onClick={() => dispatch(deleteContactMessage(item._id))}
                  ></ion-icon>
                </div>
                <div>
                  <ion-icon
                    name="eye-outline"
                    id="eye-icon"
                    onClick={toggling}
                  ></ion-icon>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    )
  );
};

export default AdminMessages;
