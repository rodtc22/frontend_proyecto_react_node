// se va a encargar de conectar con Backend para las categorias
import api from './api';

const categoriaService = {
    listar: () => {
        return api.get("/categoria")
    },
    guardar: (datos) => {
        return api.post("/categoria", datos);
    }
}

export default categoriaService;