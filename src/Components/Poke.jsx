import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import './style.css'
import Swal from 'sweetalert2'


export const Poke = () => {

    const [pokemon, setPokemon] = useState(null);
    const [id, setId] = useState(1);
    const [busqueda, setBusqueda] = useState("");
    // const [evolucion, setEvolucion] = useState(null);

    //Hacemos la petición
    useEffect(() => {
        //Almacenamos el pokemon
        setPokemon(null)//Aun sin dato establecido
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((res) => res.json())//Promesa para que sea en formato json
            .then((data) => {//Promesa para el formato
                setPokemon({
                    //Adjuntamos el objeto JSON numero - nombre - imagen
                    numero: data.id,
                    nombre: data.name,
                    altura: data.height,
                    peso: data.weight,
                    tipo: data.types[0].type.name,
                    img: data.sprites.other.dream_world.front_default,
                    experiencia: data.base_experience,
                    hp: data.stats[0].base_stat,
                    ataque: data.stats[1].base_stat,
                    defensa: data.stats[2].base_stat,
                    especial: data.stats[3].base_stat,
                })
            }).catch(error => {
                console.error('Error en la primera solicitud:', error);
            });
        // fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        //     .then((res) => res.json())//Promesa para que sea en formato json
        //     .then((data) => {//Promesa para el formato
        //         setEvolucion({
        //             //Adjuntamos el objeto JSON numero - nombre - imagen
        //             id: data.id,
        //             evolucion: data.chain.evolves_to[0].species.name
        //         })
        //     }).catch(error => {
        //         console.error('Error en la segunda solicitud:', error);
        //     });
    }, [id])


    const handleAnterior = () => {
        id > 1 && setId(id - 1)
    }
    const handleSiguiente = () => {
        setId(id + 1)
    }

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //Validamos el comienzo 
        if (busqueda.length > 1) {

            const num = id > 1 && setId(id - 1)

            setPokemon(null)
            fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}/`)
                .then((res) => res.json())
                .then((data) => {
                    setPokemon({
                        nombre: data.nombre
                    })
                    setId(
                        data.id
                    )
                    setBusqueda(
                        data.busqueda
                    )
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: '"' + busqueda + '" no es un pokemon válido!'
                    })
                    //setBusqueda("".target.value);
                    setBusqueda(num);
                    //alert("|| " + busqueda + " || No es un pokemon válido")
                    console.error('Error en la primera solicitud:' + num + " | ", error);
                });

        }

    }



    return (
        <>
            <div className="contenedor">
                <div className="card">
                    <h1>POKEDEX</h1>
                    <p>Para Benjumunu</p>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                value={busqueda}
                                autoFocus
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>
                    <div className="botones">
                        <button onClick={handleAnterior}> Anterior </button>
                        <button onClick={handleSiguiente}> Siguiente </button>
                    </div>

                    {/* Visualizamo que cargue  */}
                    {
                        !pokemon ? <div className="loader"> </div> :
                            <>
                                <div className='info'>
                                    <h2>{pokemon.nombre}</h2>
                                    <h4>Peso: {pokemon.peso} Kgs</h4>
                                    <h4>Altura: {pokemon.altura}0 cms</h4>
                                    <h4>Tipo: {pokemon.tipo}</h4>
                                    {/* <h4>Evolucion: {evolucion.evolucion}</h4> */}
                                    <h4>Experiencia: {pokemon.experiencia}</h4>
                                    <h4>HP: {pokemon.hp}</h4>
                                    <h4>Ataque: {pokemon.ataque}</h4>
                                    <h4>Defensa: {pokemon.defensa}</h4>
                                    <h4>Especial: {pokemon.especial}</h4>
                                </div>

                            </>
                    }
                </div>
                <div className="cont-img">
                    {
                        !pokemon ? <h5>Cargando...</h5> :
                            <>
                                <img src={pokemon.img} alt={pokemon.img} />
                            </>
                    }
                </div>



            </div>
            {/* Tecla Windows + . (Accedemos a emogis) */}

        </>
    )
}
