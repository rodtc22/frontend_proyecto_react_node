import {Outlet, NavLink} from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            {/* <Navlink to ="/admin">ADMIN</Navlink>
            <Navlink to ="/admin/categoria">CATEGORIA</Navlink>
             */}
            <h1>DISENO PRINCIPAL: Admin Layout</h1>
            <Outlet />
        </>
    );
}

export default AdminLayout;