import { useState, useEffect } from "react";
import TablePagination from "../../components/TablePagination";
import clienteService from "../../services/clienteService";

const Cliente = () => {
  const [cliente, setCliente] = useState({
    email: "",
    password: "",
  });
  const [clientes, setClientes] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const columnas = [
    { key: "nombre_completo", label: "NOMBRE COMPLETO" }, // label, significa como quiero que se muestre
    { key: "nit", label: "NIT" },
    { key: "correo", label: "CORREO" },
    { key: "ci_nit", label: "CI/NIT" },
    { key: "telefono", label: "TELEFONO" },
  ];

  useEffect(() => {
    // esto se vuelve a ejecutar a menos que cambie algun estado en este caso el hook columnas
    getClientes();
  }, []);

  const getClientes = async (nroPage = 1) => {
    setPage(nroPage);
    const { data } = await clienteService.listar(q, nroPage, limit);
    setTotal(data.count);
    setClientes(data.rows);
  };

  const handleShow = (datos) => {
    setCliente(datos);
  };

  const handleEdit = (datos) => {
    setCliente(datos);
  };

  const handleErase = async (datos) => {
    if (confirm("Esta seguro de eliminar este cliente?")) {
      try {
        await clienteService.eliminar(datos.id);
        getClientes();
      } catch (error) {
        alert("Ocurrio un problema al eliminar el cliente.");
      }
    }
  };

  return (
    <>
      <TablePagination
        columnas={columnas}
        datos={clientes}
        total={total}
        limit={limit}
        page={page}
        fetchData={getClientes}
        handleEdit={handleEdit}
        handleErase={handleErase}
        handleShow={handleShow}
      ></TablePagination>
    </>
  );
};

export default Cliente;
