import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ENVIRONMENT from '../../constants/environment';
import methods_http from '../../constants/methodsHTTP';

const EmailVerificationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [status, setStatus] = useState('verificando'); // 'verificando', 'exito', 'error'
    const [message, setMessage] = useState('');

    // Extraer token de la URL
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

        // Llamada al backend para verificar el token
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${ENVIRONMENT.URL_API}/api/users/verify`, {
                    method: methods_http.POST, // o GET, según tu backend
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ verify_token: token }),
                });
                const data = await response.json();

                if (response.ok && data.ok) {
                    setStatus('exito');
                    setMessage('¡Tu correo fue verificado con éxito! Ahora podés iniciar sesión.');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'No se pudo verificar el correo.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Error al conectar con el servidor.');
            }
        };

        verifyEmail();
    }, [location.search]);

    return (
        <section style={{ padding: '2rem', textAlign: 'center' }}>
            {status === 'verificando' && <p>🌟 Verificando tu correo, un instante…</p>}
            {status === 'exito' && (
                <>
                    <h2>✅ ¡Correo Verificado!</h2>
                    <p>{message}</p>
                    <button onClick={() => navigate('/login')}>Ir a Iniciar Sesión</button>
                </>
            )}
            {status === 'error' && (
                <>
                    <h2>❌ Error en la Verificación</h2>
                    <p>{message}</p>
                    <button onClick={() => navigate('/register')}>Volver a Registrarse</button>
                </>
            )}
        </section>
    );
};

export default EmailVerificationScreen;
