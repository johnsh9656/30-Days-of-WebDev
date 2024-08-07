import React, { useState, useEffect } from 'react'
import completedLesson from '../assets/completedLesson.png'
import incompleteLesson from '../assets/incompleteLesson.png'
import unavailableLesson from '../assets/unavailableLesson.png'
import './LessonTile.css'
import LessonInfo from './LessonInfo'

function LessonTile({ lessonKey, lessonData, shiftStyle, progress, handleStart, selectedLesson, setSelectedLesson, handlePractice }) {
  
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
      `lesson-tile-start` : `lesson-tile-start invisible`;
  } else {
    imgSrc = unavailableLesson;
  }

  const toggleBox = () => {
    setSelectedLesson(lessonKey);
    setLessonInfoVisible(!lessonInfoVisible);
  }

  return (<>
    <div className={`lesson-tile-container ${shiftStyle}`}>
      <img src={imgSrc} className={lessonData.status} onClick={toggleBox}/>
      {lessonData.status == "incomplete" && (
        <div className={startVisualClass}>
          START
        </div>
      )}

      <LessonInfo visible={lessonInfoVisible && selectedLesson == lessonKey} 
                  lessonData={lessonData} 
                  handlePractice={handlePractice} 
                  handleStart={handleStart}
                  progress={progress.progressIndex}
                  shiftStyle={shiftStyle}
      />
    
    </div>
  </>)
}

export default LessonTile;