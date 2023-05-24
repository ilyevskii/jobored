import React from "react";
import "./App.css";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import {EmptyState, Header, SingleVacancyInfo} from "components";
import {VacanciesPage, FavoriteVacanciesPage} from "pages";


export default function App() {
  return (
      <Router basename="/">
          <Header/>
          <Routes>
              <Route path="/" element={<Navigate to="/vacancies"/>}/>
              <Route path="/vacancies" element={<VacanciesPage/>}/>
              <Route path="/favorites" element={<FavoriteVacanciesPage/>}/>
              <Route path="/vacancy">
                  <Route path=":id" element={<SingleVacancyInfo/>}/>
              </Route>
              <Route path="/error" element={<EmptyState is_error={true}/>}/>
              <Route path="/empty" element={<EmptyState/>}/>
              <Route path="*" element={<Navigate to="/empty" replace={true}/>}/>
          </Routes>
      </Router>
  );
}
