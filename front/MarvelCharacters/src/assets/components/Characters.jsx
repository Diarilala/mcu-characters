import { useState, useEffect } from 'react';
import { 
  getCharacters, 
  addCharacter, 
  characterById,
  updateCharacter, 
  deleteCharacter 
} from './api';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    lastname: '',
    universe: ''
  });

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await getCharacters();
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleAddCharacter = async () => {
    try {
      await addCharacter(newCharacter);
      setNewCharacter({ name: '', lastname: '', universe: '' });
      fetchCharacters();
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  const handleUpdateCharacter = async (id) => {
    const characterToUpdate = characters.find(c => c.id === id);
    try {
      await updateCharacter(id, characterToUpdate);
      fetchCharacters();
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleDeleteCharacter = async (id) => {
    try {
      await deleteCharacter(id);
      fetchCharacters();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  return (
    <div className='bg-white text-black h-[500px] rounded-2xl flex flex-col gap-3'>
      <h1>MCU Characters</h1>
      
      {/* Add Character Form */}
      <div className='px-3 flex gap-1'>
        <input
            className='rounded-xl px-2'
            placeholder="Id"
            value={newCharacter.id}
            onChange={(e) => setNewCharacter({...newCharacter, id: e.target.value})}
             />
        <input
        className='rounded-xl px-2'
          placeholder="Name"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
        />
        <input
        className='rounded-xl px-2'
          placeholder="Real Name"
          value={newCharacter.lastname}
          onChange={(e) => setNewCharacter({...newCharacter, lastname: e.target.value})}
        />
        <input
        className='rounded-xl px-2'
          placeholder="Universe"
          value={newCharacter.universe}
          onChange={(e) => setNewCharacter({...newCharacter, universe: e.target.value})}
        />
        <button onClick={handleAddCharacter} className='text-white'>Add Character</button>
      </div>

      {/* Characters List */}
      <ul className='overflow-y-scroll bg-amber-200 flex flex-col rounded-2xl'>
        {characters.map(character => (
          <li key={character.id} className='my-2 flex justify-between px-4 items-center'>

            {character.id} {character.name} {character.lastname} ({character.universe})
            <div className='flex gap-2'>
                <button onClick={() => handleUpdateCharacter(character.id)} className='text-white'>Update</button>
            <button onClick={() => handleDeleteCharacter(character.id)}className='text-white'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}