
import React, { useState, useEffect } from 'react';

function BlankTypeProblem({ problemDetails, selectedWords, setSelectedWords, answered, problemIndex }) {

    const handleInputChange = (index, value) => {
        const newSelectedWords = [...selectedWords];
        newSelectedWords[index] = value;
        setSelectedWords(newSelectedWords);
    };

    const problemText = problemDetails.separatedText.map((segment, index) => {

        const blank = index < problemDetails.separatedText.length - 1 ? 
            <input 
                type="text" 
                value={selectedWords[index] || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
            /> : null;

        return <React.Fragment key={index}>
                <span>{segment}</span>
                {blank}
            </React.Fragment>
    });

    
    
    return (<div className="content-area">
        <h1>{problemDetails.titleText}</h1>
        <div className="problem-text-blank">
            {problemText}
        </div>
        <hr></hr>

    </div>)

}

export default BlankTypeProblem;