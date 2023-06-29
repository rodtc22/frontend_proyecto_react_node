import { useState, useEffect } from "react";
import TablePagination from "../../components/TablePagination";
import usuarioService from "../../services/usuarioService";

const Usuario = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);

  const columnas = [
    { key: "id", label: "COD" }, // label, significa como quiero que se muestre
    { key: "email", label: "CORREO ELECTRONICO" },
    { key: "created_at", label: "CREADO EN" },
  ];

  useEffect(() => {
    // esto se vuelve a ejecutar a menos que cambie algun estado en este caso el hook columnas
    getUsuarios();
  }, []);

  const getUsuarios = async (nroPage = 1, limit = 2) => {
    setPage(nroPage);
    const { data } = await usuarioService.listar(q, nroPage, limit);
    setTotal(data.count);
    setUsuarios(data.rows);
  };

  const handleShow = (datos) => {
    setUsuarios(datos);
  };

  const handleEdit = (datos) => {
    setUsuarios(datos);
  };

  const handleErase = async (datos) => {
    if (confirm("Esta seguro de eliminar este usuario?")) {
      try {
        await usuarioService.eliminar(datos.id);
        getUsuarios();
      } catch (error) {
        alert("Ocurrio un problema al eliminar el usuario.");
      }
    }
  };

  return (
    <>
      <TablePagination
        columnas={columnas}
        datos={usuarios}
        total={total}
        page={page}
        fetchData={getUsuarios}
        handleEdit={handleEdit}
        handleErase={handleErase}
        handleShow={handleShow}
      ></TablePagination>
    </>
  );
};

export default Usuario;
