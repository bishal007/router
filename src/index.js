import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, useParams, NavLink } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((data) => data.json())
    .then((data) => setPosts(data));
  }, []);
  return (
    <>
      <div className="post-container">
        {
          posts.map((post) => (
            <div className="post" key={post.id}>
              <NavLink style={{ textDecoration: 'none', color: 'black', display: 'block' }} to={`/posts/${post.id}`}>{post.title}</NavLink>
            </div>
          ))
        }
      </div>
    </>
  );
};

const About = () => {
  return (
    <>
      <h1>About Page</h1>
    </>
  );
};

const Profile = () => {
  return (
    <>
      <h1>Profile Page</h1>
    </>
  );
};

const User = () => {
  return (
    <>
      <h1>User Page</h1>
    </>
  );
};

const Setting = () => {
  return (
    <>
      <h1>Setting Page</h1>
    </>
  );
};

const SayUser = () => {
  const params = useParams();
  return (
    <>
      <h1>Your name is {params.userName}</h1>
    </>
  );
};

const Posts = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    .then((data) => data.json())
    .then((data) => setData(data));
  }, []);

  return (
    <>
      {data === null ? <h1>Loading...</h1> :
          <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
          </div>
      }
    </>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="account">
          <Route path="user" element={<User />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="/posts/:postId" element={<Posts />} />
        <Route path="/user/:userName" element={<SayUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
