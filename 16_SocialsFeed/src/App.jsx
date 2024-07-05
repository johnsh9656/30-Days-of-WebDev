
import React, { useState } from 'react';
import Feed from './Feed.jsx';
import CreatePost from './CreatePost.jsx';
import './App.css'
import reactLogo from './assets/react.svg';

const user = {
  pfpUrl: reactLogo,
  username: "SHMUNGUS"
};

function App() {
  const [newPost, setNewPost] = useState(null);

  const addPost = (post) => {
    setNewPost(post);
  }

  return (
    <>
      <h1>Social Media Feed App</h1>
      <CreatePost addPost={addPost} user={user}/>
      <hr></hr>
      <Feed newPost={newPost}/>
    </>
  )
}

export default App
