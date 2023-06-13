import Inicio from "../views/Inicio";
import Login from "../views/Login";
import Nosotros from "../views/Nosotros";
import SitioLayout from "../layouts/SitioLayout";

const SitioRoutes = {
    path : '/',
    element: <SitioLayout/>,
    children: [
        {
            path: '',
            element: <Inicio/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'nosotros',
            element: <Nosotros/>
        }
    ]
}

export default SitioRoutes;