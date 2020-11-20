import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import Nav from './components/Nav/Nav';
import Tree from './components/Tree/Tree';
import Canvas from './components/Canvas/Canvas';
import Right from './components/Right/Right';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <div className="content">
        <Tree />
        <Canvas />
        <Right />
      </div>
    </>
  );
}

export default App;
