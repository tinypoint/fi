import React from 'react';
import Nav from './components/Nav/Nav';
import Tree from './components/Tree/Tree';
import Canvas from './components/Canvas/Canvas';
import Right from './components/Right/Right';
import styles from './App.module.scss';

function App() {
  return (
    <>
      <Nav />
      <div className={styles.content}>
        <Tree />
        <Canvas />
        <Right />
      </div>
    </>
  );
}

export default App;
