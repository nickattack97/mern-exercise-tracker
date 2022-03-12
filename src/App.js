import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercise.component";
import CreateExercises from "./components/create-exercise.component";
import CreateUsers from "./components/create-user.component";

function App() {
  return (
    <Router>
         <Navbar />
          <br/>
      <Routes>
          <Route path="/" element={<ExercisesList/>} />
          <Route path="/edit/:id" element={<EditExercises/>} />
          <Route path="/create" element={<CreateExercises/>} />
          <Route path="/user" element={<CreateUsers/>} />
      </Routes>
    </Router>
  );
}

export default App;
