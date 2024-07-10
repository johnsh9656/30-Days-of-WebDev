import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import TopBar from './TopBar'
import BottomBar from './BottomBar'
import ContentArea from './ContentArea'

const lesson = {
  problems: [
    {
      type: 'blank typed',
      titleText: "Fill in the blanks",
      separatedText: ["Juan", "regalo chocolates en mi cumpleanos, pero yo no", "regale nada."],
      selection: [],
      answer: ["me", "le"],
      answered: false
    },
    {
      type: 'translate',
      titleText: "Write this in English",
      problemText: "Llegaste temprano y yo me puse muy nerviosa.",
      selection: ['sister', 'You', 'I', 'your', 'arrived', 'got', 'very',
                'and', 'nervous', 'bicycle', 'husband', 'early'],
      answer: ['You', 'arrived', 'early', 'and', 'I', 'got', 'very', 'nervous'],
      answered: false
    },
    {
      type: 'match',
      titleText: "Match the words",
      left: ["hug", "to arrive", "you gave", "nervous", "I felt"],
      selection: ["llegar", "me puse", "darte", "abrazo", "nerviosa", 
                "regale", "me sentí", "Juan", "diste", "llegaste"],
      answer: ["abrazo", "llegar", "diste", "nerviosa", "me sentí"],
      answered: false
    },
    {
      type: 'translate',
      titleText: "Write this in English",
      problemText: "¿Entonces te dio un beso a ti? ¿O le dio un beso a él?",
      selection: ['sister', 'you', 'Or', '?', 'kiss', 'hug', 'an', 'kiss', 'a', 
                'she', 'So', 'did', 'her', 'she', 'give', 'a', 'him',
                'did', 'give', '?', 'hug'],
      answer: ['So', 'did', 'she', 'give', 'you', 'a', 'kiss', '?', 
              'Or', 'did', 'she', 'give', 'him', 'a', 'kiss', '?'],
      answered: false
    },
    {
      type: 'blank typed',
      titleText: "Fill in the blank",
      separatedText: ["Ayer tuve un sueño hermoso, pero luego me ", " en mi cama"],
      selection: [],
      answer: ['desperte'],
      answered: false
    },
    {
      type: 'translate',
      titleText: "Write this in Spanish",
      problemText: "She got happy when I gave it to her.",
      selection: ['Se', 'contenta', 'puse', 'ingles', 'lo', 'se', 'regalé',
                  'cuando', 'Llegaste', 'puso', 'cita', 'Carlos', 'muy'],
      answer: ['Se', 'puso', 'contenta', 'cuando', 'se', 'lo', 'regalé'],
      answered: false
    },
    {
      type: 'blank typed',
      titleText: "Fill in the blanks",
      separatedText: ["¿Nuestro romance fue real o fue un ", "?"],
      selection: [],
      answer: ['sueno'],
      answered: false
    },
    {
      type: 'match',
      titleText: "Match the words",
      left: ["date", "romance", "began", "kiss", "our"],
      selection: ["beso", "me puse", "romance", "fue", "nuestro", 
                "comenzó", "cita", "Felipe", "diste", "vaca"],
      answer: ["cita", "romance", "comenzó", "beso", "nuestro"],
      answered: false
    },
    {
      type: 'translate',
      titleText: "Write this in Spanish",
      problemText: "That romance started in two thousand two.",
      selection: ['comenzó', 'Tu', 'el', 'Este', 'Ese', 'dos', 'en',
                'y', 'cient', 'dos', 'romance', 'mil'],
      answer: ['Ese', 'romance', 'comenzó', 'en', 'el', 'dos', 'mil', 'dos'],
      answered: false
    },
    {
      type: 'match',
      titleText: "Match the words",
      left: ["beautiful", "he gave me", "necklace", "first", "dream"],
      selection: ["cita", "isla", "sueño", "tener", "collar", 
                "me regaló", "Sanchez", "hermoso", "ojos", "primera"],
      answer: ["hermoso", "me regaló", "collar", "primera", "sueño"],
      answered: false
    },
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

  useEffect(() => {
    console.log('progress: ' + progress);
    console.log(`halfway index: ${lesson.problems.length % 2 == 0 ? 
      (lesson.problems.length/2)-1 : (lesson.problems.length-1)/2 - 1}` );
  }, [progress])

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
    

    setAnswerState(correct == true ? 'Correct' : 'Wrong');
    if (correct) {
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
    /*if (halfway) {
      setProblems([...problems.slice(0, problemIndex+1), 
                  {titleText: "Break"}, 
                  ...problems.slice(problemIndex+1)]);
    }
    else*/ if (problemIndex + 1 == problems.length) {
      //setProblems(...problems, {titleText: "Success", attemps: problems.length});
      setGameOver({status: true, outcome: "complete", attempts: problems.length});
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
      <ContentArea 
        problemDetails={problems[problemIndex]} 
        selectedWords={selectedWords} 
        setSelectedWords={setSelectedWords}
        answered={answerState=="Correct"||answerState=="Wrong"}
        gameOver={gameOver}
        problemIndex={problemIndex}
      />
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
