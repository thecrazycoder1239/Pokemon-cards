export default function PokemonStat(props) {
    const ability = props.pokemonStat.ability.name;
    return (
        <li>{ability}</li>
    )
}