import React, { useState } from 'react';
import './RegisterScreen.css';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { REGISTER_FIELD_NAMES } from '../../constants/form/register'




const RegisterScreen = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);//es true si se pudo registrar el usuario.

    // Estado para capturar los valores del formulario de registro
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // Hook para redireccionar a otra ruta  

    // Manejador del envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // evita recargar la página

        try {
            setError(null);
            setLoading(true);
            setSuccess(false);
            const serverData = await register({
                name: formState[REGISTER_FIELD_NAMES.NAME],
                email: formState[REGISTER_FIELD_NAMES.EMAIL],
                password: formState[REGISTER_FIELD_NAMES.PASSWORD]
            })
            setLoading(false);
            //  Verificar si hubo un error
            if (!serverData.ok) {
                if (
                    serverData.message === "Usuario ya registrado"

                ) {
                    setError("Este email ya está registrado.");
                } else {
                    setError(serverData.message || "Error al registrarse.");
                }
                return;
            }
            setSuccess(true);

            if (serverData.ok) {
                navigate("/verify-email");
            }

        } catch (error) {
            console.log("Error en el formulario de registro:", error);
        }
    };

    // Manejador de cambio de inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
        setError(null); // se limpian los errores de pantalla.
        setSuccess(false);
    };

    return (
        <section className="register-container">

            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-form-text">
                    <h1>Registrate aqui!</h1>
                    <p>Completa los siguientes campos : </p>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='name'>Nombre:</label>
                    <input
                        id='name'
                        name={REGISTER_FIELD_NAMES.NAME}
                        type='text'
                        placeholder='Tu nombre'
                        value={formState[REGISTER_FIELD_NAMES.NAME]}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor='email'>Email:</label>
                    <input
                        id='email'
                        name={REGISTER_FIELD_NAMES.EMAIL}
                        type='email'
                        placeholder='tuemail@mail.com'
                        value={formState[REGISTER_FIELD_NAMES.EMAIL]}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor='password'>Contraseña:</label>
                    <input
                        id='password'
                        name={REGISTER_FIELD_NAMES.PASSWORD}
                        type='password'
                        placeholder=''
                        value={formState[REGISTER_FIELD_NAMES.PASSWORD]}
                        onChange={handleChange}
                    />
                </div>
                <div className="error-container">
                    <span style={{ visibility: error ? 'visible' : 'hidden' }}>
                        {error || 'Mensaje placeholder'}
                    </span>
                </div>
                <div className='btn-container'>
                    {
                        loading
                            ? <button className='register-btn' type="submit" disabled>Registrando...</button>
                            : success
                                ? <button className='register-btn' type="button" disabled>Usuario Registrado!</button>
                                : <button className='register-btn' type="submit">Registrarse</button>
                    }

                    <div className='redireccion-container' >
                        <span>¿Ya tienes una cuenta? </span>
                        <button
                            className='login-btn'
                            onClick={() => navigate('/login')}

                        >
                            Iniciá sesión
                        </button>
                    </div>
                </div>
            </form>


        </section >
    );

};

export default RegisterScreen;