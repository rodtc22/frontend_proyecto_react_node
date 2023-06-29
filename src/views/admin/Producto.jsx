import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import productoService from "../../services/productoService";
import categoriaService from "../../services/categoriaService";

const Producto = () => {
  // const [columnas, setColumnas] = useState([
  //   "nombre",
  //   "precio",
  //   "stock",
  //   "estado",

  //   // "categoriaId",
  // ]);
  const columnas = [
    { key: "id", label: "COD" }, // label, significa como quiero que se muestre
    { key: "nombre", label: "NOMBRE" },
    { key: "precio", label: "PRECIO" },
    { key: "stock", label: "CANTIDAD" },
    { key: "Categorium.nombre", label: "CATEGORIA" },
  ];
  const [prod, setProd] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    categoriaId: "",
    descripcion: "",
  });
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3); // ahora limit maneja cuando items se pueden ver
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  //paginacion

  useEffect(() => {
    // esto se vuelve a ejecutar a menos que cambie algun estado en este caso el hook columnas
    getProductos();
    getCategoria();
  }, []);

  const getProductos = async (nroPage = 1) => {
    setPage(nroPage);
    const { data } = await productoService.listar(q, nroPage, limit);
    setTotal(data.count);
    setProductos(data.rows);
  };

  const getCategoria = async () => {
    const { data } = await categoriaService.listar(q);
    setCategorias(data);
  };

  const funGuardar = async (e) => {
    e.preventDefault(); // prevenir la recarga
    try {
      if (prod.id) {
        await productoService.modificar(prod.id, prod);
      } else {
        await productoService.guardar(prod);
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetData();
      getProductos();
    }
  };

  const resetData = () => {
    setProd({
      nombre: "",
      precio: 0,
      stock: 0,
      categoriaId: "",
      descripcion: "",
    });

    setOpenModal(false);
  };

  const handleChange = (e) => {
    // se va a encargar de recibir todos los datos del formulario
    const { name, value } = e.target;
    console.log("NAME: ", name, " value ", value);
    setProd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShow = (datos) => {
    setProd(datos);
    setOpenModal(true);
  };

  const handleEdit = (datos) => {
    setProd(datos);
    setOpenModal(true);
  };

  const handleErase = async (datos) => {
    if (confirm("Esta seguro de eliminar este producto?")) {
      try {
        await productoService.eliminar(datos.id);
        getProductos();
      } catch (error) {
        alert("Ocurrio un problema al eliminar el producto.");
      }
    }
    resetData();
  };

  return (
    <>
      <div className="mt-8">
        <h1>Gestion de Productos</h1>
        <table className="w-full divide-y-1 divide-gray-200">
          <thead>
            <tr>
              {columnas.map((columna, index) => (
                <th
                  className="py-2 px-4 text-left text-sm font-medium uppercase"
                  key={index}
                >
                  {columna.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {productos.map((producto, index) => (
              <tr key={producto.id}>
                {columnas.map((col, pos) => (
                  <td key={pos} className="py-2 px-4 text-gray-500 text-center">
                    {/* {producto[col]} */}
                    {/* ESTA FUNCION EVAL ES MUY UTIL PARA VOLVER TODO ESO EN UNA VARIABLE */}
                    {eval("producto." + col.key)}
                  </td>
                ))}
                <td className="py-2 px-4 text-gray-500 text-center flex gap-1 ">
                  <button
                    className="p-1 bg-green-500 text-white hover:bg-green-800 rounded"
                    onClick={() => handleShow(producto)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-1 bg-blue-500 text-white hover:bg-blue-800 rounded"
                    onClick={() => handleEdit(producto)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-1 bg-red-500 text-white hover:bg-red-800 rounded"
                    onClick={() => {
                      handleErase(producto);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center m-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => getProductos(page - 1)}
              disabled={page == 1}
              className="p-1 bg-gray-200 text-gray-500 hover:bg-gray-300  rounded-l-lg "
            >
              Anterior
            </button>
            {total > limit && (
              <div className="flex">
                {Array.from({ length: Math.ceil(total / limit) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => getProductos(index + 1)}
                      className={`${
                        page === index + 1 ? "bg-blue-500" : "bg-gray-200"
                      } py-1 px-3 focus:outline-none mx-1  text-white rounded-md`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            )}

            <button
              onClick={() => getProductos(page + 1)}
              disabled={page == Math.ceil(total / limit)}
              className="p-1 bg-gray-200 text-gray-500 hover:bg-gray-300  rounded-r-lg "
            >
              Siguiente
            </button>
          </nav>
        </div>
      </div>

      <button
        className="bg-blue-400 text-white py-2 px-3 rounded-full "
        onClick={() => {
          setOpenModal(!openModal);
        }}
      >
        Nuevo Producto
      </button>

      {/* ESTOY ENVIANDO EL HOOK Y PODEMOS VER QUE LLEGARA AL MODEL CON OTRO NOMBRE EN modalOpen */}
      <Modal modalOpen={openModal} setOpenModal={resetData}>
        {/* {JSON.stringify(prod)} */}
        <form
          onSubmit={(e) => {
            funGuardar(e);
          }}
        >
          <label>Ingrese Nombre</label>
          <input
            type="text"
            name="nombre"
            value={prod.nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />

          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={prod.precio}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={prod.stock}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />

          <label>Categoria</label>
          <select
            name="categoriaId"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          >
            <option value="-1">Seleccione una opcion</option>
            {categorias.map((cate) => (
              <option
                value={cate.id}
                key={cate.id}
                selected={cate.id == prod.categoriaId ? true : false}
              >
                {cate.nombre}
              </option>
            ))}
          </select>

          <label>Descripcion</label>
          <textarea
            name="descripcion"
            onChange={handleChange}
            value={prod.descripcion}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
            rows="3"
          ></textarea>

          <input
            type="submit"
            value="Guardar producto"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 mr-2 rounded"
          />
        </form>
      </Modal>
    </>
  );
};

export default Producto;
