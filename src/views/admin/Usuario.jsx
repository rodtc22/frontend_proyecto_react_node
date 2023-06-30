import { useState, useEffect } from "react";
import TablePagination from "../../components/TablePagination";
import usuarioService from "../../services/usuarioService";
import Modal from "../../components/Modal";

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
  const [openModal, setOpenModal] = useState(false);

  const columnas = [
    { key: "id", label: "COD" }, // label, significa como quiero que se muestre
    { key: "email", label: "CORREO ELECTRONICO" },
    { key: "created_at", label: "CREADO EN" },
  ];

  useEffect(() => {
    getUsuarios();
  }, []);

  const resetData = () => {
    setUsuario({ email: "", password: "" });
    setOpenModal(false);
  };

  const getUsuarios = async (nroPage = 1) => {
    setPage(nroPage);
    const { data } = await usuarioService.listar(q, nroPage, limit);
    setTotal(data.count);
    setUsuarios(data.rows);
  };

  const handleShow = (reg) => {
    setUsuario(reg);
    setOpenModal(true);
  };

  const handleEdit = (reg) => {
    setUsuario(reg);
    setOpenModal(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const funGuardar = async (e) => {
    e.preventDefault(); // prevenir la recarga
    try {
      if (usuario.id) {
        await usuarioService.modificar(usuario.id, usuario);
      } else {
        await usuarioService.guardar(usuario);
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetData();
      getUsuarios();
    }
  };

  const handleErase = async (reg) => {
    if (confirm("Esta seguro de eliminar este usuario?")) {
      try {
        await usuarioService.eliminar(reg.id);
        getUsuarios();
      } catch (error) {
        alert("Ocurrio un problema al eliminar el usuario.");
      }
    }
  };

  return (
    <>
      <button
        className="bg-blue-400 text-white py-1 px-2 rounded-full "
        onClick={() => {
          setOpenModal(!openModal);
        }}
      >
        Nuevo Usuario
      </button>

      <TablePagination
        columnas={columnas}
        datos={usuarios}
        total={total}
        page={page}
        limit={limit}
        fetchData={getUsuarios}
        handleEdit={handleEdit}
        handleErase={handleErase}
        handleShow={handleShow}
      ></TablePagination>
      
      <Modal modalOpen={openModal} setOpenModal={resetData}>
        <form
          onSubmit={(e) => {
            funGuardar(e);
          }}
        >
          <label>Ingrese Nombre</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />

          <label>Ingrese Contrasena</label>
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          />

          <input
            type="submit"
            value="Guardar usuario"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 mr-2 rounded"
          />
        </form>
      </Modal>
    </>
  );
};

export default Usuario;
