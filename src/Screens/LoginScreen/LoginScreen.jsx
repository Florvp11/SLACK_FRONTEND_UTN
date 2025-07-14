import React, { useState } from 'react';
import './LoginScreen.css';
import LOCALSTORAGE_KEYS from '../../constants/localStorage.js'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { LOGIN_FIELD_NAMES } from '../../constants/form/login'

const LoginScreen = () => {

    //estados componen cuando se va a re-renderizar un componente.
    //capturar los valores del formulario 

    const [formState, setFormState] = useState({ email: '', password: '' });
    const navigate = useNavigate(); //para redireccionar a otra ruta
    const [error, setError] = useState(null); //para mostrar un mensaje de error
    const [loading, setLoading] = useState(false); //para mostrar un mensaje de carga




    const handleSubmit = async (event) => { //lo q pasa cuando aprieto 'iniciar sesion'
        event.preventDefault(); //hace q no se actulice la pagina al enviar submit
        try {
            setLoading(true); //muestra el mensaje de carga
            //capturo y envio los datos a la API.
            const serverData = await login({
                email: formState[LOGIN_FIELD_NAMES.EMAIL],
                password: formState[LOGIN_FIELD_NAMES.PASSWORD],
            })
            setLoading(false);

            //una vez iniciada sesion quiero enviar al usuario a la pantalla de inicio
            if (serverData.ok) {
                localStorage.setItem(LOCALSTORAGE_KEYS.authorizationToken, serverData.data.autorizathionToken);
                navigate("/home");

            } else {
                setError(serverData.message);
            }
        }
        catch (error) {
            setError(error.message)
        }
    }


    //capturamos lo qque escribimos en el formulario.Cambia el estado del formulario
    const handleChange = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name; //viene del name del campo del input
        setFormState((prevFormState) => ({ ...prevFormState, [fieldName]: value })); //... es una replica actualizar el estado con el nuevo valor
        setError(null);
    }




    return (
        <section className="login-container">


            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-text">
                    <h1>Inicia Sesion</h1>
                    <p>Accede a tu cuenta para continuar</p>
                </div>

                <div className="input-wrapper">
                    <label htmlFor='email'>Ingresa tu email: </label>
                    <input id='email' name={LOGIN_FIELD_NAMES.EMAIL} placeholder='tumail@mail.com' type='email' value={formState[LOGIN_FIELD_NAMES.EMAIL]} onChange={handleChange} /> {/*cada vez q hayaun cambio de valor en mi input se activa handlechange*/}
                </div >
                <div className="input-wrapper">
                    <label htmlFor='password'>Ingresa tu contraseña : </label>
                    <input id='password' name={LOGIN_FIELD_NAMES.PASSWORD} type='password' value={formState[LOGIN_FIELD_NAMES.PASSWORD]} onChange={handleChange} />
                </div>
                <div className="error-container">
                    <span style={{ visibility: error ? 'visible' : 'hidden' }}>
                        {error || 'Mensaje placeholder'}
                    </span>
                </div>
                <div className='btn-container'>
                    {
                        loading
                            ? <button className='btn-LogIn' type='submit' disabled={loading}>Cargando...</button>
                            : <button className='btn-LogIn' type='submit'>Iniciar Sesion</button>

                    }

                    <div className='redireccion-container'>
                        <span> ¿Eres nuevo? </span>
                        <button
                            className='registerBtn'
                            onClick={() => navigate('/register')}>

                            Registrate
                        </button>
                    </div>
                </div>

            </form>



        </section >


    )
};

export default LoginScreen;
