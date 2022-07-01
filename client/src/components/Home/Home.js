import React from "react";
import { motion } from "framer-motion";
import "./Home.scss";

const Home = () => {
  let boxVariants = {};
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    boxVariants = {
      hover: {
        x: [0, 100, 0],
      },
    };
  }

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
            <span>Welcome to</span> WhereTo? Dive!
          </h1>
        </motion.div>

        <div className="main_section">
          <div className="main__background">
            <div className="main_section-quote">
              <q>
                The sea, once it casts its spell, holds on in its net of wonder
                forever.
              </q>
              <p>Jacques-Yves Cousteau</p>
              <hr />
            </div>
            <p className="home-text">
              Welcome to <strong>Where To?</strong> <span>DIVE</span> - a place
              where you can share and find the best diving spots from all over
              the world. Our website will help you find the best places in your
              area and more. Are you interested in wrecks, caves, or maybe
              beautiful coral reefs? You can find everything with us! Regardless
              of the level of your training. The website was created to share
              the best diving sites with people from all over the world. Are you
              planning a holiday trip? Or maybe a quick weekend trip out of
              town? See where it's best to dive. Maybe you accidentally
              discovered a great reservoir for diving yourself? Share this place
              with the rest of the people.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
