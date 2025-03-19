import React, { useState, useEffect } from 'react';
import './App.css';
import QuizPage from './QuizPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

type queryResult = {
  _type: string,
  name: string,
  course: any,
  _id: string
}


type quizRef = {
  name: string,
  _id: string
}


function App() {

  const [courses, setCourses] = useState<Record<string, quizRef[]>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SANITY_COURSES_URL}`);
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        let tempCourses: Record<string, quizRef[]> = {}
        data.result.forEach((res: queryResult) => {
          if (res._type === "course") {
            tempCourses[res.name] = []
          } else {
            tempCourses[res.course.name].push({ name: res.name, _id: res._id })
          }
        })
        setCourses(tempCourses)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);
  const HomePage = () => {
    return <div className="HomePageContainer">
      <div className="graphicBg">
        <img src="assets/homeGraphic.jpeg" width="100%" height="100%" alt="This is a pretty picture"/>
      </div><div className="HomePage">
        <h1 className="HomePageTitle">Hebrew On The Web</h1>
        <p className="HomePageDesc">Welcome to the website, HEBREW ON THE WEB - Exercises for the Student of Modern Hebrew, a project of the Penn Language Center of the University of Pennsylvania. It has been funded by a grant from the Instructional Computing Development Fund and is maintained by the Penn Language Center and the Modern Hebrew Language Program of the Department of Near Eastern Languages and Civilizations.</p>
        {Object.entries(courses).map(([key, value]) => {
          return <div className="CourseDiv">
            <h2>{key}</h2>
            {value.map((quiz) => {
              return <Link to={"/" + quiz._id}>{quiz.name}</Link>
            })}
          </div>
        })}
      </div>
    </div>
  }

  return (
    <div className="app-body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.entries(courses).map(([key, value]) => {
            return <>{value.map((quizRef) => {
              return <Route path={quizRef._id} element={<QuizPage _id={quizRef._id} />} />
            })}</>
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
