// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    // Fetching courses
    axios.get('/api/courses')
      .then(res => {
        setCourses(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLogin = () => {
    // Simulated login function
    setLoggedIn(true);
  };

  const handleCourseSelect = (courseId) => {
    setSelectedCourses([...selectedCourses, courseId]);
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Available Courses</h2>
          <ul>
            {courses.map(course => (
              <li key={course.id}>
                {course.name} - {course.instructor}
                <button onClick={() => handleCourseSelect(course.id)}>Select Course</button>
              </li>
            ))}
          </ul>
          <h2>Selected Courses</h2>
          <ul>
            {selectedCourses.map(courseId => (
              <li key={courseId}>
                {courses.find(course => course.id === courseId).name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;