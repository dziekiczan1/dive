import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import Spots from "./components/Spots/Spots";
import AddSpot from "./components/AddSpot/AddSpot";
import Contact from "./components/Contact/Contact";
import AdminMessages from "./components/AdminMessages/AdminMessages";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Posts from "./components/Posts/Posts";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/admin/messages" exact element={<AdminMessages />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/posts" exact element={<Spots />} />
          <Route path="/posts/search" exact element={<Posts />} />
          <Route path="/addspots" exact element={<AddSpot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
