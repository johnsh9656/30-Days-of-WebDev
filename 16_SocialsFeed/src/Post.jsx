
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';

function Post(props) {
    const defaultText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, fuga nam. Aliquid voluptatem consequatur, ullam ducimus sit consequuntur maiores asperiores."
    const { pfpUrl, username, text, uid, likes, dislikes, category, images } = props.details;
 
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [currentDislikes, setCurrentDislikes] = useState(dislikes);

    const addLike = () => {
        setCurrentLikes(currentLikes + 1);
    }
    
    const addDislike = () => {
        setCurrentDislikes(currentDislikes + 1);
    }

    return (<div className="post">
        <div className="category-title">{category || ""}</div>
        <div className="post-head">
            <img src={pfpUrl || reactLogo} />
            <p>{username || "Undef"}</p>
        </div>
        <div className="content">
            <p>{text || defaultText}</p>
        </div>
        <div className="post-foot">
            <div className="rate-btn" onClick={addLike}>
                <span className="like-btn">👍</span>{currentLikes}
            </div>
            <div className="rate-btn" onClick={addDislike}>
                <span className="dislike-btn">👎</span>{currentDislikes}
            </div>
        </div>
    </ div>)
}



export default Post; 