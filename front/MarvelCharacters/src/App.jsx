import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Characters from './assets/components/Characters';

function App() {
  return (
    <div className="App">
      <Characters />
    </div>
  );
}

export default App;
