import React from "react";

const Input = ({ label, handleChange, name, type }) => {
  return (
    <>
      <input
        name={name}
        onChange={handleChange}
        placeholder={label}
        label={label}
        type={type}
        rows="1"
        className="form__textarea"
      />
    </>
  );
};

export default Input;
