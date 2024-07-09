
import reactLogo from './assets/react.svg'
import { useState, useEffect } from 'react';
import TranslateProblem from './TranslateProblem';
import BlankTypeProblem from './BlankTypeProblem';

function ContentArea({ problemDetails, selectedWords, setSelectedWords, answered, gameOver, problemIndex }) {

    if (gameOver.status) {
        const containerClass = gameOver.outcome == "complete" ? 
            "content-area success" : "content-area failure";
        const titleText = gameOver.outcome == "complete" ? 
            "Great Job!" : "Failure";
        const emoji = gameOver.outcome == "complete" ? "✅" : "❌";
        const pText = gameOver.outcome == "complete" ? 
            `You completed this lesson in ${gameOver.attempts} attempts.` : 
            "Better luck next time";

        return (
            <div className={containerClass}>
                <hr></hr>
                <h1>{titleText}</h1>
                <h2>{emoji}</h2>
                <p>{pText}</p>
                <hr></hr>
            </div>
        )
    }
    else if (problemDetails.titleText == "Break") {


        return (<div className="content-area break">
            <h1>Half way there!</h1>
            <h2>Great job!</h2>
        </div>)
    }

    if (problemDetails.type == 'translate') {
        return <TranslateProblem 
            problemDetails={problemDetails} 
            selectedWords={selectedWords} 
            setSelectedWords={setSelectedWords}
            answered={answered}
            problemIndex={problemIndex}
        />;
    }
    else if (problemDetails.type == 'blank typed') {
        return <BlankTypeProblem 
            problemDetails={problemDetails} 
            selectedWords={selectedWords} 
            setSelectedWords={setSelectedWords}
            answered={answered}
            problemIndex={problemIndex}
        />
    }

    

}



export default ContentArea;