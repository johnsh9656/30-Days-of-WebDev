import React, { useState, useEffect } from 'react'
import completedLesson from './assets/completedLesson.png'
import incompleteLesson from './assets/incompleteLesson.png'
import unavailableLesson from './assets/unavailableLesson.png'
import './Lesson.css'
import LessonInfo from './LessonInfo'

function Lesson({ lessonKey, lessonData, shiftStyle, progress, handleStart, selectedLesson, setSelectedLesson }) {
  
  const [lessonInfoVisible, setLessonInfoVisible] = useState(false);

  useEffect(() => {
    if (selectedLesson !== lessonKey) {
      setLessonInfoVisible(false);
    }
  }, [selectedLesson]);
  

  let imgSrc = "";
  let startVisualClass = false;
  if (lessonData.status == "complete") {
    imgSrc = completedLesson;
  } else if (lessonData.status == "incomplete") {
    imgSrc = incompleteLesson;
    startVisualClass = !lessonInfoVisible ? 
      `lesson-start` : `lesson-start invisible`;
  } else {
    imgSrc = unavailableLesson;
  }

  const toggleBox = () => {
    setSelectedLesson(lessonKey);
    setLessonInfoVisible(!lessonInfoVisible);
  }

  const handlePracticeBtn = () => {
    setSelectedLesson('');
  }

  return (<>
    <div className={`lesson-container ${shiftStyle}`}>
      <img src={imgSrc} className={lessonData.status} onClick={toggleBox}/>
      {lessonData.status == "incomplete" && (
        <div className={startVisualClass}>
          START
        </div>
      )}

      <LessonInfo visible={lessonInfoVisible && selectedLesson == lessonKey} 
                  lessonData={lessonData} 
                  handlePractice={handlePracticeBtn} 
                  handleStart={handleStart}
                  progress={progress.subLessonIndex}
                  shiftStyle={shiftStyle}
      />
    
    </div>
  </>)
}

export default Lesson;