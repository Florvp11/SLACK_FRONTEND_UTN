import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/authService';
import './EmailVerificationScreen.css'; // Importa el CSS

const EmailVerificationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [status, setStatus] = useState('verificando'); // 'verificando', 'exito', 'error'
    const [message, setMessage] = useState('');

    const getTokenFromQuery = () => {
        const params = new URLSearchParams(location.search);
        return params.get('verify_token');
    };

    useEffect(() => {
        const token = getTokenFromQuery();

        if (!token) {
            setStatus('error');
            setMessage('No se encontró el token de verificación en la URL.');
            return;
        }

        verifyEmail(token)
            .then((data) => {
                if (data.ok) {
                    setStatus('exito');
                    setMessage(data.message || 'Correo verificado con éxito.');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Error al verificar el correo.');
                }
            })
            .catch((error) => {
                setStatus('error');
                setMessage(error.message || 'Error en la conexión con el servidor.');
            });
    }, [location.search]);

    return (
        <section className="verification-container">
            <div className="verification-box">
                {status === 'verificando' && <p className="verificando">Verificando tu correo, un instante…</p>}
                {status === 'exito' && (
                    <>
                        <h2 className="exito">¡Correo Verificado!</h2>
                        <p>{message}</p>
                        <button className="btn btn-exito" onClick={() => navigate('/login')}>Ir a Iniciar Sesión</button>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <h2 className="error">Error en la Verificación</h2>
                        <p>{message}</p>
                        <button className="btn btn-error" onClick={() => navigate('/register')}>Volver a Registrarse</button>
                    </>
                )}
            </div>
        </section>

    );
};

export default EmailVerificationScreen;
