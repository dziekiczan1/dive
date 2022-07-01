import React, { useState } from "react";
import Form from "../Form/Form";
import { motion } from "framer-motion";
import "./AddSpot.scss";

const AddSpot = () => {
  let boxVariants = {};
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    boxVariants = {
      hover: {
        x: [0, 100, 0],
      },
    };
  }

  const [currentId, setCurrentId] = useState(0);

  return (
    <>
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
            <span>Share Your Spot </span> With Us!
          </h1>
        </motion.div>

        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </>
  );
};

export default AddSpot;
