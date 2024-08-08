import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import correctSound from './assets/audio/correct.mp3';
import wrongSound from './assets/audio/wrong.mp3'
import failSound from './assets/audio/womp.mp3';
import copmleteSound from './assets/audio/complete.mp3';
import './App.css'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import ContentArea from './ContentArea'
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import lesson from './lesson.js';

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

  useEffect(() => {
    if (gameOver.outcome == 'failure') {
      failAudio.play();
    }
    else if (gameOver.outcome == 'complete') {
      completeAudio.play();
    }
  }, [gameOver])

  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);
  const failAudio = new Audio(failSound);
  const completeAudio = new Audio(copmleteSound);

  useEffect(() => {
    // Preload audio files
    correctAudio.preload = 'auto';
    wrongAudio.preload = 'auto';
  }, []);

  const handleCheck = () => {

    if (!checkAvailable()) return;

    let correct = true;
    if (problems[problemIndex].type == 'translate') {
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
    }
    else if (problems[problemIndex].type == 'blank typed') {
      if (selectedWords.length !== problems[problemIndex].answer.length) {
        correct = false;
      }
      selectedWords.forEach((value, index) => {
        if (value.trim().toLowerCase() !== problems[problemIndex].answer[index].trim().toLowerCase()) {
          correct = false;
        }
      });
    }
    else if (problems[problemIndex].type == 'match') {
      for (let i=0;i<selectedWords.length; i++) {
        if (selectedWords[i] !== problems[problemIndex].answer[i]) {
          console.log(`${selectedWords[i]} should be ${problems[problemIndex].answer[i]}`)
          correct = false;
        }
      }
    }
    
    setAnswerState(correct ? 'Correct' : 'Wrong');

    if (correct) {
      correctAudio.play();
      const halfwayIndex = lesson.problems.length % 2 == 0 ? 
      (lesson.problems.length/2)-1 : (lesson.problems.length-1)/2 - 1;
      if (progress == halfwayIndex) {
        setProblems([...problems.slice(0, problemIndex+1), 
                          {titleText: "Break"}, 
                          ...problems.slice(problemIndex +1)]);
      }
      setProgress(progress + 1);
    } 
    else {
      wrongAudio.play();
      setLives(lives - 1);
      if (lives - 1 <= 0) {
        setGameOver({status: true, outcome: "failure"})
      }
      setProblems([...problems, problems[problemIndex]]);
    }
  }

  const handleSkip = () => {
    wrongAudio.play();
    setProblems([...problems, problems[problemIndex]]);
    setAnswerState('Wrong');
  }

  const retry = () => window.location.reload();

  const continueLesson = () => {
    if (problemIndex + 1 == problems.length) {
      //setProblems(...problems, {titleText: "Success", attemps: problems.length});
      setGameOver({status: true, outcome: "complete", attempts: problems.length - 1});
      confetti();
      const completeAudio = new Audio('./assets/audio/complete.mp3');
      completeAudio.play();
    }

    setProblemIndex(problemIndex + 1);
  }

  const checkAvailable = () => {
    const problemType = problems[problemIndex]?.type;

    if (problemType == 'translate') {
      return selectedWords.length > 0;
    }
    else if (problemType == 'blank typed') {
      const filteredSelection = selectedWords.filter((value) => value.length > 0 );
      return filteredSelection.length == problems[problemIndex].answer.length;
    } else if (problemType == 'match') {
      return selectedWords.length == problems[problemIndex].answer.length;
    } else {
      console.log('type undefined');
    }
  }

  return (
    <>
      <TopBar 
        lives={lives} 
        progress={progress/lesson.problems.length}
        retry={retry}
      />
      <div className="main-container">
        <ContentArea 
          problemDetails={problems[problemIndex]} 
          selectedWords={selectedWords} 
          setSelectedWords={setSelectedWords}
          answered={answerState=="Correct"||answerState=="Wrong"}
          gameOver={gameOver}
          problemIndex={problemIndex}
        />
      </div>
      <BottomBar 
        checkAvailable={checkAvailable()} 
        handleCheck={handleCheck}
        answerState={answerState}
        continueLesson={continueLesson}
        skip={handleSkip}
        gameOver={gameOver}
        retry={retry}
        halfway={problems[problemIndex]?.titleText === "Break" || false}
      />
    </>
  )
}

export default App
