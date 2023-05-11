import React from 'react';
import './App.css';
import {Header, Filters, Searchbar} from "components";
import {QueryClient, QueryClientProvider} from "react-query";

const client = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={client}>
          <Header/>
          <div className="container">
              <Filters/>
              <main>
                  <Searchbar/>
              </main>
          </div>
      </QueryClientProvider>
  );
}

export default App;
