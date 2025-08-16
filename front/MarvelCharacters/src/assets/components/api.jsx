import axios from 'axios';

const api = "http://localhost:8080";
export const getCharacters = () => axios.get(`${api}/characters`);
export const addCharacter = (character) => axios.post(`${api}/characters`, character);
export const characterById = (id) => axios.get(`${api}/characters/${id}`);
export const updateCharacter = (id, character) => axios.put(`${api}/characters/${id}`);
export const deleteCharacter = (id) => axios.delete(`${api}/characters/${id}`);