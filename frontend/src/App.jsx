import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header cartCount={3} />
      <main id="main" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome to Spatula World!</h2>
        <p>Your header component is working if you can see it above this text.</p>
      </main>
    </>
  );
}

export default App;