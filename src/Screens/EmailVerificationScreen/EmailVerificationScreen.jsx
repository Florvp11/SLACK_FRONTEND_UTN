import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailVerificationScreen.css'; // ¡Acordate de crear este archivo!

const EmailVerificationScreen = () => {
    const navigate = useNavigate();

    return (
        <section className='verification-screen-container'>
            <div className='verification-message'>
                <h1>¡Gracias por registrarte!</h1>
                <p className='verification-phrase'>
                    Te enviamos un email de verificación. <br />
                    Revisalo y luego iniciá sesión para continuar.
                </p>
                <button className='btn btn-register' onClick={() => navigate('/')}>
                    Volver al inicio
                </button>
                <div className='login-prompt'>
                    <span>¿Ya verificaste tu cuenta?</span>
                    <button className='btn btn-login' onClick={() => navigate('/login')}>
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EmailVerificationScreen;
