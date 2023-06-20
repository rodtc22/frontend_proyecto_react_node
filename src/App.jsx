import Routes from "./routes"

import './layouts/css/style.css';
import './layouts/charts/ChartjsConfig'


const App = () => {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;


// <Routes>
//         {/* ESTO NO SE VISUALIZA POR QUE SON SOLO RUTAS*/}
//         <Route path="/" element={<Inicio />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/nosotros" element={<Nosotros />}></Route>
//         <Route path="/categoria" element={<Categoria />}></Route>
//       </Routes>