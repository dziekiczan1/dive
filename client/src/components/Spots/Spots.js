import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";
import { motion } from "framer-motion";

import "./Spots.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Spots = () => {
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));
  const isAdmin = user?.result?.admin === true;
  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <>
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
        <Posts setCurrentId={setCurrentId} />
      </motion.div>
      <div className="pagination">
        <Pagination page={page} />
      </div>
      {isAdmin && <Form currentId={currentId} setCurrentId={setCurrentId} />}
    </>
  );
};

export default Spots;
