import React from 'react';
import ReactDOM from 'react-dom/client';
import { createClient, Provider, defaultExchanges } from 'urql';
import App from './components/App';
import './index.css';
import { devtoolsExchange } from '@urql/devtools';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const client = createClient({
  url: 'https://graphql.anilist.co',
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <BrowserRouter>
        <header>
          <Link to="/">Home</Link> <Link to="/other">Other</Link>
        </header>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/other" element={<div>Other page</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
