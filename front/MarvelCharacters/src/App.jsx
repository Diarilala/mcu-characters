import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

const api = "http://localhost:8080";
export const getCharacters = () => axios.get(`${api}/characters`);
export const addCharacter = (character) => axios.post(`${api}/characters`, character);
export const characterById = (id) => axios.get(`${api}/characters/${id}`);
export const updateCharacter = (id, character) => axios.put(`${api}/characters/${id}`);
export const deleteCharacter = (id) => axios.delete(`${api}/characters/${id}`);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

export default App
