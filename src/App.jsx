import {Routes, Route, NavLink} from "react-router-dom"
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Nosotros from "./views/Nosotros";
import Categoria from "./views/Categoria";

const App = () => {
  return (
    <>
      ESTE NAVLINK YA SE PUEDE VER VISUALMENTE
      <hr />
      <NavLink to = "/">INICIO</NavLink>  | 
      <NavLink to = "/login">LOGIN</NavLink>  |  
      <NavLink to = "/nosotros">NOSOTROS</NavLink>  |  
      <NavLink to = "/categoria">CATEGORIA</NavLink>
      <hr />

      <Routes>
        {/* ESTO NO SE VISUALIZA POR QUE SON SOLO RUTAS*/}
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/nosotros" element={<Nosotros />}></Route>
        <Route path="/categoria" element={<Categoria />}></Route>
      </Routes>
    </>
  );
}

export default App;
