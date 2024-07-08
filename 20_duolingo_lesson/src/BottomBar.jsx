
function BottomBar({ inputLength, handleCheck, answerState, continueLesson, skip, gameOver, retry }) {

    if (gameOver.status) {
        const stateImg = gameOver.outcome == "complete" ? "✔️" : "❌";
        const containerClass = gameOver.outcome == "complete" ? "correct-bar" : "wrong-bar";
        const footerClass = "footer " + containerClass;
        
        return (<div className={footerClass}>
            <div className={containerClass}>
                <h2>{stateImg}</h2>
                <button 
                    onClick={retry}
                >Try Again</button>
            </div>
        </div>)
    }


    const getCheckBtnClass = () => {
        return inputLength > 0 ? 'check-btn-coloured' : 'check-btn-grey';
    }

    return answerState == "Not Answered" ? (<div className='footer'>
        <hr></hr>
        <div className="bottom-bar">
            <button className='skip-btn' onClick={skip}>Skip</button>
            <button 
                className={getCheckBtnClass()} 
                onClick={handleCheck}
            >Check</button>
        </div>
    </div>) : answerBar(answerState, continueLesson);
}

const answerBar = (answerState, continueLesson) => {

    const stateImg = answerState == "Correct" ? "✔️" : "❌";
    const containerClass = answerState == "Correct" ? "correct-bar" : "wrong-bar";
    const footerClass = "footer " + containerClass;

    return (<div className={footerClass}>
        <div className={containerClass}>
            <h2>{stateImg} <span>{answerState}</span></h2>
            <button 
                onClick={continueLesson}
            >Continue</button>
        </div>
    </div>)
}


export default BottomBar;