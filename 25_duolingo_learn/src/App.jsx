import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lesson from './Lesson.jsx'

const initialSections = [
  {
    title: "Testing",
    lessons: [
      {status: "incomplete", topic: "Talk about romance", progressIndex: 0, lessonsLength: 2 },
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
    ]
  },
  {
    title: "Testing 2",
    lessons: [
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 2 },
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
    ]
  },
  {
    title: "Testing 3",
    lessons: [
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 2 },
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
      {status: "unavailable", topic: "test", progressIndex: 0, lessonsLength: 1 }, 
    ]
  },
];

function App() {
  const [sections, setSections] = useState(initialSections);
  const [progress, setProgress] = useState({ sectionIndex: 0, lessonIndex: 0, subLessonIndex: 0 });
  const [selectedLesson, setSelectedLesson] = useState(false);

  const handleStartBtn = () => {
    const currentSection = sections[progress.sectionIndex];
    const currentLesson = currentSection.lessons[progress.lessonIndex];

    if (progress.subLessonIndex + 1 >= currentLesson.lessonsLength) {
      if (progress.lessonIndex + 1 >= currentSection.lessons.length) {
        // Complete current section and start the next section
        sections[progress.sectionIndex].lessons[progress.lessonIndex].status = "complete";
        sections[progress.sectionIndex + 1].lessons[0].status = "incomplete";
        setProgress({ sectionIndex: progress.sectionIndex + 1, lessonIndex: 0, subLessonIndex: 0 });
      } else {
        // Complete current lesson and start the next lesson in the same section
        sections[progress.sectionIndex].lessons[progress.lessonIndex].status = "complete";
        sections[progress.sectionIndex].lessons[progress.lessonIndex + 1].status = "incomplete";
        setProgress({ sectionIndex: progress.sectionIndex, lessonIndex: progress.lessonIndex + 1, subLessonIndex: 0 });
      }
    } else {
      setProgress({
        ...progress,
        subLessonIndex: progress.subLessonIndex + 1
      });
    }

    setSelectedLesson('');
  };

  const getSection = (section, sectionIndex) => {
    const lessons = section.lessons.map((lesson, lessonIndex) => {
      let lessonStyle = '';

      const indexModulo = lessonIndex % 4;
      if (indexModulo == 1) {
        lessonStyle = 'shift-right';
      } else if (indexModulo == 3) {
        lessonStyle = 'shift-left';
      }

      return (
        <Lesson key={`${sectionIndex}-${lessonIndex}`}
                lessonKey={`${sectionIndex}-${lessonIndex}`}
                lessonData={section.lessons[lessonIndex]} 
                shiftStyle={lessonStyle}
                progress={progress}
                handleStart={handleStartBtn}
                selectedLesson={selectedLesson}
                setSelectedLesson={setSelectedLesson}
        />
      )
    });

    return (<>
      <div key={`${section.title}-${sectionIndex}`} className="section">
        <hr></hr>
        <h2>{section.title}</h2>
        <hr className="bottom-hr"></hr>
        {lessons}
      </div>
    </>)
  }

  const getAllSections = (sections) => {
    return sections.map((section, index) => getSection(section, index));
  };

  return (<>
    <div className="container">
      {getAllSections(sections)}
    </div>
  </>)
}

export default App
