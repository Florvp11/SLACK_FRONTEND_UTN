import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckEmailScreen = () => {
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState(null);
    const email = localStorage.getItem('pendingVerificationEmail');

    useEffect(() => {
        if (!email) {
            navigate('/register');
            return;
        }

        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/check-verification?email=${encodeURIComponent(email)}`);
                const data = await response.json();

                if (data.verified) {
                    clearInterval(intervalId);
                    localStorage.removeItem('pendingVerificationEmail');
                    navigate('/login');
                }
            } catch (err) {
                console.error('Error al verificar estado:', err);
                setError("No se pudo verificar el estado de la cuenta.");
                clearInterval(intervalId);
            }
        }, 5000); // cada 5 segundos

        return () => clearInterval(intervalId);
    }, [email, navigate]);

    return (
        <section className="check-email-container">
            <h1>Chequeá tu email</h1>
            <p>Te enviamos un correo para activar tu cuenta.</p>
            <p>Estamos esperando que completes la verificación...</p>
            {error && <span className="error">{error}</span>}
        </section>
    );
};

export default CheckEmailScreen;
