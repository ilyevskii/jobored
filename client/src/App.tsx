import React from 'react';
import './App.css';
import {Header, Filters, Searchbar, VacanciesList} from "components";


function App() {
  return (
      <>
          <Header/>
          <div className="container">
              <Filters/>
              <main>
                  <Searchbar/>
                  <VacanciesList/>
              </main>
          </div>
      </>
  );
}

export default App;
