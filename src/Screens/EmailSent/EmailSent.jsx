import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailSent.css'

const EmailVerificationSent = () => {
    const navigate = useNavigate();


    return (
        <div className='verification-screen-container'>
            <div className='verification-message'>
                <h2>¡Gracias por registrarte!</h2>
                <p className='verification-phrase'>
                    Te enviamos un email de verificación. <br />
                    Revisalo y luego iniciá sesión para continuar.
                </p>
                <div className='btn'>
                    <button className='btnHome' onClick={() => navigate('/')}>
                        Volver al inicio
                    </button>
                    <button className='btnLog ' onClick={() => navigate('/login')}>
                        Iniciar Sesion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationSent;