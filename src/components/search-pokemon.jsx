import {useState} from 'react';

export default function SearchPokemon({setPokemonURL}) {
    const [newPokemonURL, setNewPokemonURL] = useState(''); 

    return (
        <section className='search'>
        <form onSubmit={(event) => {
            event.preventDefault()
            setPokemonURL(newPokemonURL.toLowerCase());
        }}>
            <label id='label' htmlFor="pokemonSearch">The pokemon you want to battle with is... </label>
            <input id="pokemonSearch" value={newPokemonURL} onChange={(event) => {
                setNewPokemonURL(event.target.value)
            }}></input>
            <button type="submit" className='button'>Find</button>
        </form>
        </section>
    )
}