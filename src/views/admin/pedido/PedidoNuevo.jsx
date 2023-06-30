import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import clienteService from "../../../services/clienteService";
import productoService from "../../../services/productoService";
import Modal from "../../../components/Modal";

const PedidoNuevo = () => {
  const [openModal, setOpenModal] = useState(false);

  const clienteDefault = {
    nombre_completo: "",
    nit: 0,
    correo: "",
    ci_nit: "",
    telefono: "",
  };
  const [cliente, setCliente] = useState(clienteDefault);

  // lista de productos
  const columnas = [
    { key: "id", label: "CODIGO" },
    { key: "nombre", label: "NOMBRE" },
    { key: "precio", label: "PRECIO" },
    { key: "stock", label: "CANTIDAD" },
    { key: "Categorium.nombre", label: "CATEGORIA" },
  ];
  // paginacion
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(6);
  const [q, setQ] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos();
    
  }, []);

  const getProductos = async (nroPage = 1) => {
    setPage(nroPage);
    const { data } = await productoService.listar(q, nroPage, limit);
    setTotal(data.count);
    setProductos(data.rows);
  };

  const resetData = () => {
    setCliente(clienteDefault);
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleBuyCarrito = () => {
    console.log(page, total, limit,q, productos);
  }

  const funGuardar = async (e) => {
    e.preventDefault();
    try {
      await clienteService.guardar(cliente);
      resetData();
    } catch (error) {
      console.log("Existe el error ", error, " al momento de guardar.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h1>Lista de productos</h1>
          <div className="overflow-x-scroll">
            <TablePagination
              columnas={columnas}
              datos={productos}
              total={total}
              limit={limit}
              page={page}
              fetchData={getProductos}
              handleBuyCarrito = {handleBuyCarrito}
            ></TablePagination>
          </div>
        </div>
        <div className="md:col-span-1 grid gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h1>Carrito</h1>
            <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium uppercase">
                    Nom
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium uppercase">
                    Cantidad
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium uppercase">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="py-2 px-4 text-sm text-gray-500 ">sd</td>
                  <td className="py-2 px-4 text-sm text-gray-500 ">sd</td>
                  <td className="py-2 px-4 text-sm text-gray-500 ">sd</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-sm text-gray-500 ">sd</td>
                  <td className="py-2 px-4 text-sm text-gray-500 ">sd</td>
                  <td className="py-2 px-4 text-sm text-gray-500 ">sd</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h1>Cliente</h1>
            <input
              type="search"
              name="buscar"
              className="border border-gray-300 rounded px-2 py-1 mb-2 mr-2"
            />
            <button
              className="bg-blue-400 text-white py-1 px-2 rounded-full "
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              Nuevo Cliente
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h1>Pedido</h1>
          </div>
        </div>
      </div>
      <Modal modalOpen={openModal} setOpenModal={resetData}>
        <form
          onSubmit={(e) => {
            funGuardar(e);
          }}
        >
          <label>Ingrese Nombre Completo</label>
          <input
            type="text"
            name="nombre_completo"
            value={cliente.nombre_completo}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />

          <label>Ingrese NIT</label>
          <input
            type="number"
            name="nit"
            value={cliente.nit}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />

          <label>Ingrese Correo</label>
          <input
            type="email"
            name="correo"
            value={cliente.correo}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />
          <label>Ingrese CI/NIT</label>
          <input
            type="text"
            name="ci_nit"
            value={cliente.ci_nit}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />
          <label>Ingrese telefono</label>
          <input
            type="text"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="submit"
            value="Guardar Cliente"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 mr-2 rounded"
          />
        </form>
      </Modal>
    </>
  );
};

export default PedidoNuevo;
