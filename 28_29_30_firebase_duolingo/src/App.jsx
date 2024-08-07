import { useState, useEffect } from 'react'
import './App.css'
import Auth from './Auth'
import Learn from './learn/Learn'
import { db, auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signOut } from "firebase/auth";

function App() {
  const [signedIn, setSignedIn] = useState('false');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const signOutFunc = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      { signedIn ? 
      (<>
          <Learn signOutFunc={signOutFunc}/>
      </>) : (
        <Auth />
      )}
    </>
  )
}

export default App