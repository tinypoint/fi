import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import Canvas from './components/Canvas/Canvas';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="left-area" />
      <Canvas />
      <div className="right-area" /> 
    </div>
  );
}

export default App;
