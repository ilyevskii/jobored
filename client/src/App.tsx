import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Header, VacancyInfo} from "components";
import {VacanciesPage, FavoriteVacanciesPage} from "pages";


function App() {
  return (
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<VacanciesPage/>}/>
              <Route path="/favorites" element={<FavoriteVacanciesPage/>}/>
              <Route path="/vacancy/:id" element={<VacancyInfo/>}/>
          </Routes>
      </Router>
  );
}

export default App;
