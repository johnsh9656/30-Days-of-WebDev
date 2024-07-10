
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'

function MatchProblem({ problemDetails, selectedWords, setSelectedWords, answered, problemIndex }) {

    const [availableWords, setAvailableWords] = useState(problemDetails.selection);
    const [animatingWords, setAnimatingWords] = useState([]);

    useEffect(() => {
        setAvailableWords(problemDetails.selection);
    }, [problemDetails, problemIndex]);
    
    const handleSelectWord = (word, index) => {
        if (answered || selectedWords.length == problemDetails.left.length) return;

        setAnimatingWords([...animatingWords, `selected-${selectedWords.length}`]);
        setSelectedWords([...selectedWords, word]);
        setAvailableWords(availableWords.filter((_, i) => index !== i));
    }

    const handleDeselectWord = (word, index) => {
        if (answered) return;

        setAnimatingWords([...animatingWords, `available-${availableWords.length}`]);
        setAvailableWords([...availableWords, word]);
        setSelectedWords(selectedWords.filter((_, i) => index !== i));
    }

    const removeAnimatingWord = (wordKey) => {
        setAnimatingWords(animatingWords.filter(word => word !== wordKey));
    }

    const selectedWordsElement = selectedWords.map((word, index) => {
        return (
            <div 
                key={index} 
                className={`word ${animatingWords.includes(`selected-${index}`) ? 'pop-in' : ''}`} 
                onClick={() => handleDeselectWord(word, index)}
                onAnimationEnd={() => removeAnimatingWord(`selected-${index}`)}
            >
                {word}
            </div>
        );
    });

    const Selection = ({ words }) => {
        const items = words.map((word, index) => {
            return(
                <div 
                    key={index} 
                    className={`word ${animatingWords.includes(`available-${index}`) ? 'pop-in' : ''}`} 
                    onClick={() => handleSelectWord(word, index)}
                    onAnimationEnd={() => removeAnimatingWord(`available-${index}`)}
                >
                    {word}
                </div>
            );
        });
    
        return (<>
            {items}
        </>)
    }

    const leftColumn = problemDetails.left.map((word, index) => {
        return (<div className='match-word' key={index}>{word}</div>)
    })

    return (<div className="content-area">
        <h1>{problemDetails.titleText}</h1>
        <div className="problem-match">
            <div className="match-column">{leftColumn}</div>
            <div className="match-column">{selectedWordsElement}</div>
        </div>
        <hr></hr>
        <div className="selection">
            <Selection words={availableWords}/>
        </div>
    </div>)
}

export default MatchProblem;