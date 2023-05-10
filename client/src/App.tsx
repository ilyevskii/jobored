import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Filters} from "./components/Filters/Filters";

function App() {
  return (
      <>
          <Header/>
          <div className="container">
              <Filters/>
          </div>
      </>
  );
}

export default App;
