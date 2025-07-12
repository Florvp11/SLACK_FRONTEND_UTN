import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';

const MainScreen = () => {
    const navigate = useNavigate();

    return (
        <section className="main-screen-container">
            <div className="main-message">
                <h1>¡Únete a nosotros!</h1>
                <p className="marketing-phrase">
                    Organizá tus ideas. Conectá con tu equipo. <br />
                    Tu futuro empieza aquí.
                </p>
                <button
                    className="btn btn-register"
                    onClick={() => navigate('/register')}
                >
                    Registrarse
                </button>

                <div className="login-prompt">
                    <span>¿Ya tienes una cuenta?</span>
                    <button
                        className="btn btn-login"
                        onClick={() => navigate('/login')}
                    >
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainScreen;
