
import reactLogo from '../assets/react.svg'
import { useState, useEffect } from 'react';

function TranslateProblem({ problemDetails, selectedWords, setSelectedWords, answered, problemIndex }) {

    const [availableWords, setAvailableWords] = useState(problemDetails.selection);
    const [animatingWords, setAnimatingWords] = useState([]);

    useEffect(() => {
        setAvailableWords(problemDetails.selection);
    }, [problemDetails, problemIndex]);

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

    const handleSelectWord = (word, index) => {
        if (answered) return;

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

    return (<div className="content-area">
        <h1>{problemDetails.titleText}</h1>
        <div className="problem">
            <img src={reactLogo} />
            <div className="problem-text">
                {problemDetails.problemText}
            </div>
        </div>
        <hr></hr>
        <div className={selectedWords.length > 0 ? 'input-section' : 'input-section-empty'}>
            {selectedWordsElement}
        </div>
        <hr></hr>
        <div className="selection">
            <Selection words={availableWords}/>
        </div>
    </div>)
}

export default TranslateProblem;