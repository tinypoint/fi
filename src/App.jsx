import React from 'react';
import Nav from './sections/Nav/Nav';
import Tree from './sections/Tree/Tree';
import Canvas from './sections/Canvas/Canvas';
import Right from './sections/Right/Right';
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
