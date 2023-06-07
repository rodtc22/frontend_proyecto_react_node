import React, { useState } from 'react';

const Contador = () => {
    //variables
    const [nombre, setNombre] = React.useState("Rodrix");
    const [contador, setContador] = React.useState(0);

    // funciones y metodos
    const cambiarNombre = () => {
        setNombre("Pedro");
    }

    const sumar = (val) => {
        setContador(val);
    }

    const restar = (val) => {
        setContador(val);
    }

    return (
        <>
            <h1>{nombre}</h1>
            <h3>Valor del contador : {contador}</h3>

            <button onClick={() => cambiarNombre()}>Cambiar Nombre</button>
            <hr />
            <button onClick={() => sumar(contador + 1)}>+</button>
            <button onClick={() => restar(contador - 1)}>-</button>
        </>
    );
}

export default Contador;