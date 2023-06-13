import {useState} from 'react';
import axios from 'axios';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // estads o variable (hooks de react)
    const [titulo, setTitulo] = useState("LOGIN");
    const [email, setEmail] = useState("prueba@gmail.com");
    const [password, setPassword] = useState("prueba1234");
    
    // habilitamos el hook useNavigate
    const navigate = useNavigate();

    // funciones
    const funLogin = async (e) => {
        e.preventDefault(); //evita que se refresque la pagina

        const user = {email, password};

        try {
            // peticion al servidor de node
            // axios.post("http://127.0.0.1:4000/api/auth/login", user).then(res => console.log(res));
            const {data} = await authService.loginConNode(user);
            console.log(data);

            //obtengo el token para validar credenciales y saber que tipo de usuario es
            localStorage.setItem("acces_token", data.access_token);

            navigate("/admin/categoria");
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    }

    // retornar html
    return (
        <>
            <h1>Pagina: {titulo}</h1>
            <h3>Email: {email}</h3>
            <h3>Password: {password}</h3>
            <form onSubmit={(e) => funLogin(e)}>
                <label>Ingrese Correo:</label>
                <input type="email" onChange={(e) => {setEmail(e.target.value)}} required/>
                <br />
                <label>Ingrese Contrasena:</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} required/>
                <br />
                <input type="submit" />  
                <input type="reset" />
                <button onClick={(e) => funLogin(e)}>PRUEBA</button>
            </form>
        </>    
    );
}

export default Login;