import './App.css';
import Header from './components/header.jsx';
import SearchPokemon from './components/search-pokemon';
import {useState} from 'react';
import PokemonResults from './components/pokemon-results';
import Footer from './components/footer.jsx';


function App() {
  const [pokemonURL, setPokemonURL] = useState('');

  return (
    <div className="App">
      <Header/>
      <SearchPokemon setPokemonURL={setPokemonURL}/>
      <PokemonResults pokemonURL={pokemonURL}/>
      <Footer/>
    </div>
  );
}

export default App;
