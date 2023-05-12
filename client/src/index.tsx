import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from "react-query";
import {store} from 'store/store';

const client = new QueryClient();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <QueryClientProvider client={client}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </QueryClientProvider>
    </Provider>
);

