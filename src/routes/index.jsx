import {useRoutes} from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import SitioRoutes from "./SitioRoutes"

const ThemeRoutes = () => {
    return useRoutes([SitioRoutes, AdminRoutes])
}

export default ThemeRoutes;