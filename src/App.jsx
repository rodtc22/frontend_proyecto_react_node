import {Routes, Route, NavLink} from "react-router-dom"
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Nosotros from "./views/Nosotros";

const App = () => {
  return (
    <>
      ESTE NAVLINK YA SE PUEDE VER VISUALMENTE
      <hr />
      <NavLink to = "/">INICIO</NavLink>  | 
      <NavLink to = "/login">LOGIN</NavLink>  |  
      <NavLink to = "/nosotros">NOSOTROS</NavLink>


      <Routes>
        {/* ESTO NO SE VISUALIZA POR QUE SON SOLO RUTAS*/}
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/nosotros" element={<Nosotros />}></Route>
      </Routes>
    </>
  );
}

export default App;