
import './LessonInfo.css'

function LessonInfo({ visible, lessonData, handlePractice, handleStart, progress }) {

  let infoBox = <></>;
  const visibilityClass = visible ? `lesson-info` : `lesson-info hidden`;

  if (lessonData.status == "complete") {
    infoBox = (<>
      <div className={visibilityClass}>
        <div className="text-section">
          <h2>{lessonData.topic}</h2>
          <p>Completed Lesson</p>
        </div>
        <button className="practice-button" onClick={handlePractice}>PRACTICE +5 XP</button>
      </div>
    </>)
  } else if (lessonData.status == "incomplete") {
    infoBox = (<>
      <div className={visibilityClass}>
        <div className="text-section">
          <h2>{lessonData.topic}</h2>
          <p>Lesson {progress + 1} of {lessonData.lessonsLength}</p>
        </div>
        <button className="start-button" onClick={handleStart}>START +10 XP</button>
      </div>
    </>)
  }

  return infoBox;
}

export default LessonInfo;