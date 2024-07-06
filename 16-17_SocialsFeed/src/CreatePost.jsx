
import { useState } from 'react';

function CreatePost({ addPost, user }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addPost({
                pfpUrl: user.pfpUrl,
                username: "SHMUNGUS",
                text: text,
                uid: generateUniqueId(),
                likes: 0,
                dislikes: 0,
                category: "Friends"
            });
            setText('');
        }
    };

    return (<>
        <h2>Create Post</h2>
        <div className="post">
            <div className="category-title">{""}</div>
            <div className="create-post-head">
                <img src={user.pfpUrl} />
                <p>{user.username}</p>
            </div>
            <div className="content">
                <textarea className="multiline-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's on your mind? 🤔"
                    maxLength={500}
                />
            </div>
            <div className="create-post-foot">
                <button className="post-btn" onClick={handleSubmit}>Post</button>
                <span>📎</span>
            </div>
        </ div>

        
    </>)
}

const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export default CreatePost;
