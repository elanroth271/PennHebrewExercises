import React, {useState, useEffect} from 'react';
import './App.css';

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
          if(res._type === "course") {
            tempCourses[res.name] = []
          } else{
            tempCourses[res.course.name].push({name: res.name, _id: res._id})
          }
        })
        setCourses(tempCourses)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {Object.entries(courses).map(([key, value]) => {
        return <div>
          <h2>{key}</h2>
          {value.map((quiz) => {
            return <div>{quiz.name}</div>
          })}
        </div>
      })}
    </div>
  );
}

export default App;
