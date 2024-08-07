import { useEffect, useState } from 'react'
import { db, auth } from '../config/firebase'
import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore'
import './Learn.css'
import LessonTile from './LessonTile.jsx'
import Lesson from '../lesson/Lesson.jsx'
import LearnHeader from './LearnHeader.jsx'

function Learn({ signOutFunc }) {
  const [userData, setUserData] = useState(null)
  const [sections, setSections] = useState([]);
  const [selectedLessonKey, setSelectedLessonKey] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(false);
  const [loading, setLoading] = useState(true);
  const [practicing, setPracticing] = useState(false);

  const sectionsCollectionRef = collection(db, 'sections');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          await pollForUserDoc(userId);

          const sectionsSnapshot = await getDocs(sectionsCollectionRef);
          const sectionsData = [];

          for (const sectionDoc of sectionsSnapshot.docs) {
            const sectionData = { title: sectionDoc.data().title, lessons: [] };
            const lessonsRef = collection(db, `sections/${sectionDoc.id}/lessons`);
            const lessonsSnapshot = await getDocs(lessonsRef);

            for (const lessonDoc of lessonsSnapshot.docs) {
              const lessonData = lessonDoc.data();
              const lessonInfoRef = collection(db, `sections/${sectionDoc.id}/lessons/${lessonDoc.id}/lessonInfo`);
              const lessonInfoSnapshot = await getDocs(lessonInfoRef);
              const lessonsLength = lessonInfoSnapshot.size;

              // Fetch problems for each lessonInfo
              const sublessons = await Promise.all(
                lessonInfoSnapshot.docs.map(async (lessonInfoDoc) => {
                  const problemsRef = collection(db, `sections/${sectionDoc.id}/lessons/${lessonDoc.id}/lessonInfo/${lessonInfoDoc.id}/problems`);
                  const problemsSnapshot = await getDocs(problemsRef);
                  const problems = problemsSnapshot.docs.map(doc => doc.data());

                  return {
                    ...lessonInfoDoc.data(),
                    problems,
                  };
                })
              );

              sectionData.lessons.push({ ...lessonData, lessonsLength, sublessons });
            }

            sectionsData.push(sectionData);
          }

          setSections(sectionsData);
        } 
      } catch (err) {
        console.error('Error fetching data: ', err);
      } finally {
        setLoading(false);
      }
    };

    const pollForUserDoc = async (userId, interval = 2000, maxAttempts = 10) => {
      let attempts = 0;
      while (attempts < maxAttempts) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          return;
        }
        await new Promise(resolve => setTimeout(resolve, interval));
        attempts++;
      }
      console.log("No such document after polling.");
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && userData) {
      updateUserData(userData.sectionIndex, userData.lessonIndex, 
                      userData.progressIndex, userData.xpScore);
    }
  }, [userData, loading]);

  useEffect(() => {
    document.body.style.minWidth = selectedLesson == '' ? '0' : '650px';
  }, [selectedLesson])

  const updateUserData = async (sect, les, prog, xp) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, {
          sectionIndex: sect,
          lessonIndex: les,
          progressIndex: prog,
          xpScore: xp,
        });
        console.log("updated user data");
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  const handleStartBtn = () => {
    const currentSection = sections[userData.sectionIndex];
    const currentLesson = currentSection.lessons[userData.lessonIndex];
    const currentSublesson = currentLesson.sublessons[userData.progressIndex];
    
    // load lesson page
    setSelectedLesson(currentSublesson);
    setPracticing(false);
  };

  const handlePracticeBtn = (sect, less) => {
    const currentLesson = sections[sect].lessons[less];
    const randomIndex = Math.floor(Math.random() * currentLesson.sublessons.length);
    const randomSublesson = currentLesson.sublessons[randomIndex];
    
    // load lesson page
    setSelectedLesson(randomSublesson);
    setPracticing(true);
  }

  const handleLessonComplete = () => {
    // no update if practicing
    if (practicing) {
      setUserData({ ...userData, xpScore: userData.xpScore + 5})
      exitLesson();
      return;
    }

    // handle update to progress / user data
    const currentSection = sections[userData.sectionIndex];
    const currentLesson = currentSection.lessons[userData.lessonIndex];

    if (userData.progressIndex + 1 >= currentLesson.lessonsLength) {
      if (userData.lessonIndex + 1 >= currentSection.lessons.length) {
        // Complete current section and start the next section
        setUserData({ sectionIndex: userData.sectionIndex + 1, 
                      lessonIndex: 0, progressIndex: 0, xpScore: userData.xpScore + 10 });
      } else {
        // Complete current lesson and start the next lesson in the same section
        setUserData({ userData, sectionIndex: userData.sectionIndex, 
                      lessonIndex: userData.lessonIndex + 1, 
                      progressIndex: 0, xpScore: userData.xpScore + 10 });
      }
    } else {
      setUserData({
        ...userData,
        progressIndex: userData.progressIndex + 1,
        xpScore: userData.xpScore + 10
      });
    }

    setSelectedLessonKey('');
    setSelectedLesson(false);
  }

  const exitLesson = () => {
    setSelectedLessonKey('');
    setSelectedLesson(false);
  }

  const finishLesson = { handleComplete: handleLessonComplete, handleFail: exitLesson }

  const getSection = (section, sectionIndex) => {
    // set status of lessons
    const lessons = section.lessons.map((lesson, lessonIndex) => {
      if (sectionIndex < userData.sectionIndex) {
        section.lessons[lessonIndex].status = "complete";
      } else if (sectionIndex == userData.sectionIndex) {
        if (lessonIndex < userData.lessonIndex) {
          section.lessons[lessonIndex].status = "complete";
        } else if (lessonIndex == userData.lessonIndex) {
          section.lessons[lessonIndex].status = "incomplete";
        } else {
          section.lessons[lessonIndex].status = "unavailable";
        }
      } else {
        section.lessons[lessonIndex].status = "unavailable";
      }
      
      // handle displacement of lessons
      let lessonStyle = '';
      const indexModulo = lessonIndex % 4;
      if (indexModulo == 1) {
        lessonStyle = 'shift-right';
      } else if (indexModulo == 3) {
        lessonStyle = 'shift-left';
      }

      return (
        <LessonTile key={`${sectionIndex}-${lessonIndex}`}
                lessonKey={`${sectionIndex}-${lessonIndex}`}
                lessonData={section.lessons[lessonIndex]} 
                shiftStyle={lessonStyle}
                progress={userData}
                handleStart={handleStartBtn}
                selectedLesson={selectedLessonKey}
                setSelectedLesson={setSelectedLessonKey}
                handlePractice={() => handlePracticeBtn(sectionIndex, lessonIndex)}
        />
      )
    });

    return (<>
      <div key={`${section.title}-${sectionIndex}`} className="learn-section">
        <hr></hr>
        <h2 className='section-title'>{section.title}</h2>
        <hr className="learn-bottom-hr"></hr>
        {lessons}
      </div>
    </>)
  }

  const getAllSections = (sections) => {
    return sections.map((section, index) => getSection(section, index));
  };

  const learnPage = (
    <div className="container">
      <LearnHeader xp={loading ? '?' : userData.xpScore} signOutFunc={signOutFunc} 
                  resetUserData={() => updateUserData(0, 0, 0, 0)}
      />
      {loading ? <div className='loading-container'><p className='loading-text'>Loading...</p></div> : 
        (sections.length > 0 ? getAllSections(sections) : <p>No sections available</p>)}
    </div>
  );

  return (<>
    {selectedLesson != false ? 
      <Lesson lessonProblems={selectedLesson.problems} 
              finishLesson={finishLesson} 
              practice={practicing}/> 
      : learnPage}
  </>)
}

export default Learn
