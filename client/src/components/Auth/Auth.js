import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./Auth.scss";
import Input from "./Input";
import Icon from "./Icon";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email address",
  password: "Password",
  confirmPassword: "Confirm Password",
};

const Auth = () => {
  let boxVariants = {};
  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    boxVariants = {
      hover: {
        x: [0, 100, 0],
      },
    };
  }

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessfull. Try again later.");
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
          {isSignup ? (
            <>
              Please <span>Sign Up</span>
            </>
          ) : (
            <>
              Please <span>Sign In</span>
            </>
          )}
        </h1>
      </motion.div>
      <div className="main_section">
        <div className="form__background">
          <div className="form__header">
            <h4 className="form__head-text">
              {isSignup ? "Sign Up" : "Sign In"}
            </h4>
          </div>
          <form
            onSubmit={handleSubmit}
            className="form-container"
            autoComplete="on"
          >
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}

            <button
              type="submit"
              variant="contained"
              color="primary"
              className="form__button-send"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              render={(renderProps) => (
                <button
                  className="form__button-send"
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  starticon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <div className="form__footer-button">
              <button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
