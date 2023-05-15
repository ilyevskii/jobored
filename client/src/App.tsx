import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Header} from "components";
import {VacanciesPage} from "pages";


function App() {
  return (
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<VacanciesPage/>}/>
          </Routes>
      </Router>
  );
}

export default App;
