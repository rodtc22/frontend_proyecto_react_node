import {NavLink,Outlet} from "react-router-dom";


const SitioLayout = () => {
    return (
        <>
            <hr />
            <NavLink to = "/">INICIO</NavLink>  | 
            <NavLink to = "/login">LOGIN</NavLink>  |  
            <NavLink to = "/nosotros">NOSOTROS</NavLink>  |  
            <NavLink to = "/admin/categoria">CATEGORIA</NavLink>
            <hr />

            <h1>DISENO PRINCIPAL: Sitio Layout</h1>
            <Outlet />
        </>
    );
}

export default SitioLayout;