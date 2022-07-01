import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import "./Form.scss";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
import { fetchPlace } from "./fetchPlace";

const Form = ({ currentId, setCurrentId }) => {
  const [city, setCity] = useState("City");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);
    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "Name",
    message: "Description",
    tags: "Tags",
    maxdepth: "Max. Depth",
    typeofspot: "Type of spot",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="app__flex">
        <div className="main_section">
          <div className="form__background form__header">
            <p className="bold-text">
              Please Sign In to share your favourite diving spot
            </p>
          </div>
        </div>
      </div>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setCity("City");
    setPostData({
      title: "Name",
      message: "Description",
      tags: "Tags",
      maxdepth: "Max. Depth",
      typeofspot: "Type of spot",
      selectedFile: "",
    });
  };

  return (
    <div className="main_section">
      <div className="form__background">
        <div className="form__header">
          <h4 className="form__head-text">
            {currentId ? "Editing" : "Adding"} A <span>Diving Spot</span>
          </h4>
        </div>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="form-container"
        >
          <textarea
            className="form__textarea"
            name="title"
            label="Title"
            value={postData.title}
            rows="1"
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></textarea>
          <textarea
            className="form__textarea"
            name="tags"
            label="Tags"
            value={postData.tags}
            rows="1"
            onChange={(e) =>
              setPostData({
                ...postData,
                tags: e.target.value.split(","),
              })
            }
          ></textarea>
          <div className="form__input-spotdetails">
            <div className="form__input-city">
              <label
                className="label"
                value={postData.city}
                onChange={(e) =>
                  setPostData({ ...postData, city: e.target.value })
                }
              >
                {autocompleteErr && (
                  <span className="inputError">{autocompleteErr}</span>
                )}
                <input
                  className="form__textarea details"
                  list="places"
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleCityChange}
                  value={city}
                  required
                  pattern={autocompleteCities.join("|")}
                />

                <datalist id="places">
                  {autocompleteCities.map((city, i) => (
                    <option key={i}>{city}</option>
                  ))}
                </datalist>
              </label>
            </div>
            <textarea
              className="form__textarea mini"
              name="maxdepth"
              label="Maxdepth"
              rows="1"
              onChange={(e) =>
                setPostData({ ...postData, maxdepth: e.target.value })
              }
              value={postData.maxdepth}
            ></textarea>
            <textarea
              className="form__textarea"
              name="typeofspot"
              label="Typeofspot"
              rows="1"
              onChange={(e) =>
                setPostData({ ...postData, typeofspot: e.target.value })
              }
              value={postData.typeofspot}
            ></textarea>
          </div>
          <textarea
            className="form__textarea"
            name="message"
            label="Message"
            value={postData.message}
            rows="4"
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></textarea>
          <label className="form__filebase">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
            <ion-icon name="cloud-upload-outline" id="upload-icon"></ion-icon>
            Choose A Picture To Add
          </label>
          <div className="form__buttons">
            <button className="form__button-send" type="submit">
              Submit
            </button>
            <button className="form__button-clear" onClick={clear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
