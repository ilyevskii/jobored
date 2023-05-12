import React from 'react';
import './App.css';
import {Header, Filters, Searchbar} from "components";


function App() {
  return (
      <>
          <Header/>
          <div className="container">
              <Filters/>
              <main>
                  <Searchbar/>
              </main>
          </div>
      </>
  );
}

export default App;
