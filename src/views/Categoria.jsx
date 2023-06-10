import { useEffect, useState } from "react";
import categoriaService from "../services/categoriaService";

const Categoria = () => {
    //estados
    const [categorias, setCategorias] = useState([]);
    useEffect(() => { // useEffect es lo primero que se ejecuta
        listar()
    }, []);
    
    //funciones o metodos
    const listar = async () => {
        const {data} = await categoriaService.listar();
        setCategorias(data);
    }
    return (
        <>
            {/*  se usa solamente para visualizar facil, los datos*/}
            {JSON.stringify(categorias)}

            <table border="1">  
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>DETALLE</th>
                        <th>ACCION</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(cat=> {
                        return (
                            <tr hey = {cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nombre}</td>
                                <td>{cat.detalle}</td>
                                <td>{cat.id}</td>
                            </tr>
                        );
                    })}
                   
                </tbody>
            </table>
        </>
    );
}

export default Categoria;