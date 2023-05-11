import React from 'react';
import './App.css';
import {Header, Filters} from "components";

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
