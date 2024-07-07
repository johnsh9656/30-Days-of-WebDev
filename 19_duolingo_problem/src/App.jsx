import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import ContentArea from './ContentArea'

const problemDetails = {
  titleText: "Write this in English",
  problemText: "Llegaste temprano y yo me puse muy nerviosa.",
  selection: ['sister', 'You', 'I', 'your', 'arrived', 'got', 'very',
              'and', 'nervous', 'bicycle', 'husband', 'early'],
  answer: ['You', 'arrived', 'early', 'and', 'I', 'got', 'very', 'nervous'],
  answered: false
};


function App() {

  const [selectedWords, setSelectedWords] = useState([]);
  const [answerState, setAnswerState] = useState("Not Answered");
  const [progress, setProgress] = useState(0);

  const handleCheck = () => {
    if (selectedWords.length <= 0) return;

    let correct = true;
    if (selectedWords.length !== problemDetails.answer.length) {
      correct = false;
    }
    else {
      for (let i=0; i<selectedWords.length; i++) {
        if (selectedWords[i] !== problemDetails.answer[i]) {
          console.log(`${selectedWords[i]} should be ${problemDetails.answer[i]}`)
          correct = false;
        }
      }
    }

    setAnswerState(correct == true ? 'Correct' : 'Wrong');
    if (correct) {
      // denominator will be length of list of problems
      setProgress((progress+1)/1 * 100);
    }
  }

  const handleSkip = () => {
    setAnswerState('Wrong');
  }

  const retry = () => {
    // temp
    window.location.reload();
  }

  return (
    <>
      <TopBar 
        lives={5} 
        progress={progress}
        retry={retry}
      />
      <ContentArea 
        problemDetails={problemDetails} 
        selectedWords={selectedWords} 
        setSelectedWords={setSelectedWords}
        answered={answerState=="Correct"||answerState=="Wrong"}
      />
      <BottomBar 
        inputLength={selectedWords.length} 
        handleCheck={handleCheck}
        answerState={answerState}
        retry={retry}
        skip={handleSkip}
      />
    </>
  )
}

export default App
