import reactLogo from '../assets/react.svg'
import firebaseLogo from '../assets/firebase-icon.svg'
import './LearnHeader.css'

function LearnHeader({ xp, signOutFunc, resetUserData }) {


    return (<>
        <div className="learn-header">
            <div className="left-header-items">
                <img src={reactLogo} />
                <img src={firebaseLogo} />
                <p className="header-xp">XP: {xp}</p>
            </div>
            <div className="right-header-items">
                <button id='signOutBtn' onClick={signOutFunc}>Sign Out</button>
                <button id='resetDataBtn' onClick={resetUserData}>Reset</button>
            </div>
            
      </div>
    </>)
}

export default LearnHeader;