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
    <div>
      <h1>MCU Characters</h1>
      
      {/* Add Character Form */}
      <div>
        <input
          placeholder="Name"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
        />
        <input
          placeholder="Real Name"
          value={newCharacter.lastname}
          onChange={(e) => setNewCharacter({...newCharacter, lastname: e.target.value})}
        />
        <input
          placeholder="Universe"
          value={newCharacter.universe}
          onChange={(e) => setNewCharacter({...newCharacter, universe: e.target.value})}
        />
        <button onClick={handleAddCharacter}>Add Character</button>
      </div>

      {/* Characters List */}
      <ul>
        {characters.map(character => (
          <li key={character.id}>

            {character.id} {character.name} {character.lastname} ({character.universe})
            <button onClick={() => handleUpdateCharacter(character.id)}>Update</button>
            <button onClick={() => handleDeleteCharacter(character.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}