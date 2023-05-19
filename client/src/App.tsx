import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import {EmptyState, Header, VacancyInfo} from "components";
import {VacanciesPage, FavoriteVacanciesPage} from "pages";


function App() {
  return (
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<VacanciesPage/>}/>
              <Route path="/favorites" element={<FavoriteVacanciesPage/>}/>
              <Route path="/vacancy/:id" element={<VacancyInfo/>}/>
              <Route path="/error" element={<EmptyState is_error={true}/>}/>
              <Route path="/empty" element={<EmptyState/>}/>
              <Route path="*" element={<Navigate to="/empty" replace={true}/>}/>
          </Routes>
      </Router>
  );
}

export default App;
