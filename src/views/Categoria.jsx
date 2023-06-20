import { useEffect, useState } from "react";
import categoriaService from "../services/categoriaService";

const Categoria = () => {
    //estados
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [detalle, setDetalle] = useState("");
    const [idSeleccion, setIdSeleccion] = useState(null)
    const [buscar, setBuscar] = useState("");
    useEffect(() => { // useEffect es lo primero que se ejecuta
        listar()
    }, []);
    
    //funciones o metodos
    const listar = async () => {
        const {data} = await categoriaService.listar(buscar);
        setCategorias(data);
    }

    const guardar = async (e) => {
        e.preventDefault();

        if (idSeleccion) {
            await categoriaService.modificar(idSeleccion, {nombre, detalle})
        } else {
            await categoriaService.guardar({nombre, detalle});
        }

        listar();
        setNombre("");
        setDetalle("");
        setIdSeleccion(null);
    }

    const editarCat = async (cat) => {
        setNombre(cat.nombre);
        setDetalle(cat.detalle);
        setIdSeleccion(cat.id);
    }

    const eliminarCat = async (cat) => {
        if (confirm(`Esta seguro de eliminar esta categoria  ${cat.nombre}?`)) {
            await categoriaService.eliminar(cat.id);
            listar();
        }
    }

    const funcionBuscar = async (e) => {
        setBuscar(e.target.value);
        listar();
    }

    return (
        <>
            {/*  se usa solamente para visualizar facil, los datos*/}
            {/* {JSON.stringify(categorias)} */}

            <h5>Nombre: {nombre}</h5>
            <h5>Detalle: {detalle}</h5>
            <form onSubmit={(e) => guardar(e)}>
                <label>Ingrese Nombre: </label>
                <input type="text" value = {nombre} onChange={(e) => setNombre(e.target.value)} /> 
                <br />
                <label>Ingrese Detalle: </label>
                <textarea cols="30" rows="3" value={detalle} onChange={(e) => setDetalle(e.target.value)} ></textarea>
                <br />
                <button type="submit">Guardar Categoria</button>
            </form>

            <hr />
            <h4>Buscar por Nombre: </h4>
            <input type="text" onChange={(e) => funcionBuscar(e)} />
            <hr />

            <h3>Lista de Categorias</h3>
            <table className="table-auto w-full">  
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">NOMBRE</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">DETALLE</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">ACCION</th>
                    </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                    {categorias.map(cat=> {
                        return (
                            <tr key = {cat.id}>
                                <td className="px-6 py-3 whitespace-nowrap">{cat.id}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{cat.nombre}</td>
                                <td className="px-6 py-3 whitespace-nowrap">{cat.detalle}</td>
                                <td className="px-6 py-3 whitespace-nowrap"> 
                                    <button onClick={() => editarCat(cat)}> editar </button> 
                                     | 
                                    <button onClick={() => eliminarCat(cat)}> eliminar </button>
                                </td>
                            </tr>
                        );
                    })}
                   
                </tbody>
            </table>
        </>
    );
}

export default Categoria;