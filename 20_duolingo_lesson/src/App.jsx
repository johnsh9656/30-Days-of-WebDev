import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import ContentArea from './ContentArea'

const lesson = {
  problems: [
    {
      titleText: "Write this in English",
      problemText: "Llegaste temprano y yo me puse muy nerviosa.",
      selection: ['sister', 'You', 'I', 'your', 'arrived', 'got', 'very',
                'and', 'nervous', 'bicycle', 'husband', 'early'],
      answer: ['You', 'arrived', 'early', 'and', 'I', 'got', 'very', 'nervous'],
      answered: false
    },
    {
      titleText: "Write this in Spanish",
      problemText: "You arrived early and I got very nervous.",
      selection: ['nerviosa', 'bicicleta', 'puse', 'ingles', 'temprano', 'me', 'manzana',
                  'Ella', 'Llegaste', 'yo', 'mercado', 'y', 'muy'],
      answer: ['Llegaste', 'temprano', 'y', 'yo', 'me', 'puse', 'muy', 'nerviosa'],
      answered: false
    },
    {
      titleText: "Write this in English",
      problemText: "Quise darte un abrazo, pero te fuiste.",
      selection: ['leaving', 'an', 'left', 'hug', 'to', 'me', 'I',
                  'want', 'you', 'a', 'wanted', 'but', 'give', 'you'],
      answer: ['I', 'wanted', 'to', 'give', 'you', 'a', 'hug', 'but', 'you', 'left'],
      answered: false
    }
  ]
};


function App() {

  const [selectedWords, setSelectedWords] = useState([]);
  const [answerState, setAnswerState] = useState("Not Answered");
  const [progress, setProgress] = useState(0);
  const [problemIndex, setProblemIndex] = useState(0);
  const [problems, setProblems] = useState(lesson.problems);
  const [gameOver, setGameOver] = useState({status: false, outcome: "fail"});
  const [lives, setLives] = useState(5);

  useEffect(() => {
    setSelectedWords([]);
    setAnswerState("Not Answered");
  }, [problemIndex])

  const handleCheck = () => {
    if (selectedWords.length <= 0) return;

    let correct = true;
    if (selectedWords.length !== problems[problemIndex].answer.length) {
      correct = false;
    }
    else {
      for (let i=0; i<selectedWords.length; i++) {
        if (selectedWords[i] !== problems[problemIndex].answer[i]) {
          console.log(`${selectedWords[i]} should be ${problems[problemIndex].answer[i]}`)
          correct = false;
        }
      }
    }

    setAnswerState(correct == true ? 'Correct' : 'Wrong');
    if (correct) {
      setProgress(progress + 1);
    } 
    else {
      setLives(lives - 1);
      if (lives - 1 <= 0) {
        setGameOver({status: true, outcome: "failure"})
      }
      setProblems([...problems, problems[problemIndex]]);
    }
  }

  const handleSkip = () => {
    setProblems([...problems, problems[problemIndex]]);
    setAnswerState('Wrong');
  }

  const retry = () => {
    // temp
    window.location.reload();
  }

  const continueLesson = () => {
    if (problemIndex + 1 == problems.length) {
      //setProblems(...problems, {titleText: "Success", attemps: problems.length});
      setGameOver({status: true, outcome: "complete", attempts: problems.length});
    }

    setProblemIndex(problemIndex + 1);
  }

  return (
    <>
      <TopBar 
        lives={lives} 
        progress={progress/lesson.problems.length}
        retry={retry}
      />
      <ContentArea 
        problemDetails={problems[problemIndex]} 
        selectedWords={selectedWords} 
        setSelectedWords={setSelectedWords}
        answered={answerState=="Correct"||answerState=="Wrong"}
        gameOver={gameOver}
        problemIndex={problemIndex}
      />
      <BottomBar 
        inputLength={selectedWords.length} 
        handleCheck={handleCheck}
        answerState={answerState}
        continueLesson={continueLesson}
        skip={handleSkip}
        gameOver={gameOver}
        retry={retry}
      />
    </>
  )
}

export default App
