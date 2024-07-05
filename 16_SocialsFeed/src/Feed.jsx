
import { useState, useEffect} from 'react';
import Post from './Post.jsx';

function Feed({ newPost }) {

    const [postDetails, setPostDetails] = useState(getRandomPosts(20));
    const [feedFilter, setFeedFilter] = useState("All");

    useEffect(() => {
        if (newPost) {
            addNewPost(newPost);
        }
    }, [newPost]);

    const resetFeed = () => {
        setPostDetails(getRandomPosts(20));
        window.scrollTo({ top: 0, behavior: 'smooth'});
        setFilter("All");
    };

    const loadMorePosts = () => {
        setPostDetails([...postDetails, ...getRandomPosts(10)]);
        setFilter(feedFilter);
    };

    const addNewPost = (post) => {
        setPostDetails([post, ...postDetails]);
    };

    const getFilterBtnClass = (category) => {
        return feedFilter == category ? "selected-btn" : "unactive-btn";
    }

    const setFilter = (filter) => {
        setFeedFilter(filter);
    }

    const filters = ["All", ...categories];
    let filterBtns = filters.map((filter, index) => 
        <button 
            onClick={() => setFilter(filter)} 
            className={getFilterBtnClass(filter)}
            key={index}>{filter}
        </button>
    );

    const filteredPostDetails = feedFilter == "All" ? 
        postDetails : postDetails.filter((post) => post.category == feedFilter);

    const posts = postDetails.map((post, _) => {
        return <Post key={post.uid} details={post}/>
    });

    const filteredPosts = filteredPostDetails.map((post, _) => {
        return <Post key={post.uid} details={post}/>
    });

    return (<>
        <h2>Your Feed</h2>
        <div className="filters">
            {filterBtns}
        </div>
        {filteredPosts}
        <hr></hr>
        <div className="end-feed-btns">
            <button onClick={resetFeed}>Reset Feed</button>
            <button onClick={loadMorePosts}>Load More</button>
        </div>
    </>)
}

const getRandomPosts = (num) => {
    let posts = []

    for (let i=0; i<num; i++) {
        const postDetails = {
            pfpUrl: `src/assets/images/${getRandomItem(imageNames)}`,
            username: getRandomItem(names),
            text: getRandomItem(textOptions),
            uid: generateUniqueId(),
            likes: getRandomInt(0, 500),
            dislikes: getRandomInt(0, 300),
            category: getRandomItem(categories)
        };

        posts.push(postDetails);
    }

    return posts;
};

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomItem = (list) => {
    return list[getRandomInt(0, list.length)]
}

const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const imageNames = ["angrycat.png", "capybara.jpg", "cat.jpg", "cat2.png", 
    "dubious creature.gif", "eduardo.png", "fatcat.jpg", "image5.jpg", 
    "pigeon.jpg", "shelbon.png"];


const names = ["Ayush Mishra", "Harry J", "Alex Nik", "Coopy Grave", 
    "Post Lover 9000", "Post Lover 9000 Fan", "Hapson J Bug", "Chum Conn", 
    "Bambfrrrd", "Metal Gear Snake Eater"];

const textOptions = ["Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, libero!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eius, sapiente vero quia accusamus atque?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem consectetur maxime enim quae voluptatem eaque totam culpa! Blanditiis, nobis corrupti!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, maxime amet atque, fuga cumque maiores tempora magnam beatae nemo quis provident ut autem impedit laboriosam."
];

const categories = ["Trending", "Friends", "For You"];

export default Feed; 