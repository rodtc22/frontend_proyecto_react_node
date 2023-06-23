import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import productoService from "../../services/productoService";

const Producto = () => {
  const [columnas, setColumnas] = useState([
    "nombre",
    "precio",
    "stock",
    "estado",
    "categoriaId",
  ]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // esto se vuelve a ejecutar a menos que cambie algun estado en este caso el hook columnas
    getProductos();
  }, [columnas]);

  const getProductos = async () => {
    const { data } = await productoService.listar(q, page, limit);
    setProductos(data.rows);
    console.log("Cantidad", data.count);
    console.log("Registros", data.rows);
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
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {productos.map((producto, index) => (
              <tr key={producto.id}>
                {columnas.map((col, pos) => (
                  <td key={pos} className="py-2 px-4 text-gray-500 text-center">
                    {producto[col]}
                  </td>
                ))}
                <td className="py-2 px-4 text-gray-500 text-center">
                  <button className="py-1 px-2 bg-green-500 text-white hover:bg-green-800 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-800 rounded">
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
                  <button className="py-1 px-2 bg-red-500 text-white hover:bg-red-800 rounded">
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
      </div>

      <button className="bg-gray-300 py-2 px-4 rounded-full" onClick={() => {setOpenModal(!openModal)}}>Abrir Modal</button>

      <Modal modalOpen={openModal} setOpenModal={setOpenModal}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta nisi
          nulla dignissimos eius quaerat! Neque assumenda facere quia sit sunt
          suscipit officia quis, tempore, ullam nostrum perferendis amet ea
          alias.
        </p>
      </Modal>
    </>
  );
};

export default Producto;