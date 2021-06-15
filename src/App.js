import './App.css';
import React from 'react';
import Router from '../src/config/Router';
import { CardProvider } from '../src/config/Context';

function App() {
  return (
    <div className='App'>
      <CardProvider>
        <Router />
      </CardProvider>
    </div>
  );
}

export default App;
