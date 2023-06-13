import Categoria from "../views/Categoria";
import AdminLayout from "../layouts/AdminLayout";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout/>,
    children: [ // array de rutas hijas
        {
            path: 'categoria',
            element: <Categoria />
        }
    ]
}

export default AdminRoutes;