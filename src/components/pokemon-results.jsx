import {useState, useEffect} from 'react';
import PokemonStat from './pokemon-stat.jsx';

export default function PokemonResults({pokemonURL}) {

    const [PokemonName, setPokemonName] = useState('');
    const [pokemonAbs, setPokemonAbs] = useState([]);
    const [pokemonExp, setPokemonExp] = useState('');
    const [pokemonImg, setPokemonImg] = useState('');
    const [pokemonType, setPokemonType] = useState('normal')
    const [isLoading, setIsLoading] = useState(false);
    const [isDefault, setIsDefault] = useState(true);
    const [hasFailed, setHasFailed] = useState(false);
    const [defaultLogo, setDefaultLogo] = useState(true);

    useEffect(() => {
        setDefaultLogo(false);
        setIsLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonURL}`).then((response) => {
            return response.json();
        }).then(response => {
            if(response.abilities === undefined) {
                setIsLoading(false)
                setPokemonAbs([])
                setPokemonName('');
                setPokemonExp('');
                setPokemonImg('');
                setPokemonType('normal');
                setIsDefault(true);
                setHasFailed(false);
                setDefaultLogo(true)
            } else {
                setPokemonAbs(response.abilities)
                setPokemonName(response.name)
                setPokemonExp(response.base_experience)
                setPokemonImg(response.sprites.front_default)
                setPokemonType(response.types[0].type.name)
                setIsLoading(false)
                setIsDefault(false)
                setHasFailed(false)
            }
        }).catch((err) => {
            setIsLoading(false)
            setHasFailed(true)
            setPokemonAbs([]);
            setPokemonName('');
            setPokemonExp('');
            setPokemonImg('');
            setPokemonType('normal');
            setIsDefault(true);
        })
    }, [pokemonURL])

    return (
    <section>
        {defaultLogo ? <div className="pokeball">
      <div className="pokeball-bottom"></div>
      <div className="pokeball-top"></div>
      <div className="pokeball-middle"></div>
    </div> : <></>}
        {hasFailed ? <p>404: pokemon not found</p> : <></>}
        {isDefault ? <p>e.g. Pikachu, Bulbasur, Charmander, etc...</p> : <></>}
        {isLoading ? <p>searching the official database for your desired pokemon...</p> : 
        <ul id={pokemonType} className={isDefault ? 'hidden-stats' : 'visible-stats'}>
        <img src={pokemonImg} alt='chosen pokemon'></img>
        <li key='name'>Name: {PokemonName}</li>
        <li key='experience'>Health: {pokemonExp}</li>
        <li key="type">Type: {pokemonType}</li>
        <section id='abilities'>
        <p>abilities...</p>
        {pokemonAbs.map(object => {
            return <PokemonStat key={object.ability.name} pokemonStat={object}/>
        })}
        </section>
        </ul>}
    </section>
    );

}