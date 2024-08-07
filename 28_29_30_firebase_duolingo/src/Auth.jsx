import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import firebaseLogo from './assets/firebase-icon.svg'
import { auth, googleProvider, db } from "./config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import './Auth.css'
import { doc, setDoc, getDoc } from "firebase/firestore";

function Auth() {

    console.log(auth?.currentUser?.uid);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (!userDoc.exists()) {
                // create new user document
                await setDoc(userDocRef, {
                    sectionIndex: 0,
                    lessonIndex: 0,
                    progressIndex: 0,
                    xpScore: 0,
                });
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='auth-page'>
            <h1 className='auth-title'>Duolingo Clone</h1>
            <div className="made-with">
                <p>Made with:</p>
                <div className="auth-logos">
                    <img src={reactLogo}/>
                    <img src={viteLogo}/>
                    <img src={firebaseLogo}/>
                </div>
            </div>
            <button className='sign-in-btn' onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default Auth