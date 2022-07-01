import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { createContactMessage } from "../../actions/contact";

const Contact = () => {
  let boxVariants = {};
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    boxVariants = {
      hover: {
        x: [0, 100, 0],
      },
    };
  }

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [sendMessage, setSendMessage] = useState(false);

  const [messageData, setMessageData] = useState({
    title: "Title",
    name: "Name",
    email: "Email",
    message: "Message",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createContactMessage({
        ...messageData,
        name: user?.result?.name || messageData.name,
        email: user?.result?.email || messageData.email,
      })
    );
    clear();
    setSendMessage(!sendMessage);
  };

  const clear = () => {
    setMessageData({
      title: "Title",
      name: "Name",
      email: "Email",
      message: "Message",
    });
  };

  return (
    <div className="app__wrapper">
      <motion.div
        variants={boxVariants}
        animate="hover"
        transition={{
          type: "tween",
          duration: 5,
        }}
        className="flying-text"
      >
        <h1 className="head-text">
          How Can We <span>Help You?</span>
        </h1>
      </motion.div>

      <div className="main_section">
        <div className="form__background">
          <div className="form__header">
            <h4 className="form__head-text">
              {sendMessage ? (
                <>
                  <span>Thanks For Sending</span> A Message
                </>
              ) : (
                <>
                  <span>Send Us</span> A Message
                </>
              )}
            </h4>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <textarea
              className="form__textarea"
              name="title"
              label="Title"
              value={messageData.title}
              rows="1"
              onChange={(e) =>
                setMessageData({ ...messageData, title: e.target.value })
              }
            ></textarea>
            {user ? null : (
              <>
                <textarea
                  className="form__textarea"
                  name="name"
                  label="Name"
                  value={messageData.name}
                  rows="1"
                  onChange={(e) =>
                    setMessageData({ ...messageData, name: e.target.value })
                  }
                ></textarea>
                <textarea
                  className="form__textarea"
                  name="email"
                  label="Email"
                  value={messageData.email}
                  rows="1"
                  onChange={(e) =>
                    setMessageData({ ...messageData, email: e.target.value })
                  }
                ></textarea>
              </>
            )}
            <textarea
              className="form__textarea"
              name="message"
              label="Message"
              value={messageData.message}
              rows="4"
              onChange={(e) =>
                setMessageData({ ...messageData, message: e.target.value })
              }
            ></textarea>
            <div className="form__buttons">
              <button className="form__button-send" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
