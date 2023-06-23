import Categoria from "../views/Categoria";
import AdminLayout from "../layouts/AdminLayout";
import Producto from "../views/admin/Producto";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout/>,
    children: [ // array de rutas hijas
        {
            path: 'categoria',
            element: <Categoria />
        },
        {
            path: 'producto',
            element: <Producto />
        }
    ]
}

export default AdminRoutes;