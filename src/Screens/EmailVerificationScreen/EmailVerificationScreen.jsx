import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const EmailVerificationScreen = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    // Estado de verificación
    const [verificationStatus, setVerificationStatus] = useState('loading') // 'loading', 'success', 'pending'
    const [message, setMessage] = useState('')
    const [countdown, setCountdown] = useState(5)  // Para mostrar la cuenta regresiva en caso de éxito

    useEffect(() => {
        // Función que verifica el email con el token de la URL
        const verifyEmail = async () => {
            const verifyToken = searchParams.get('verify_token')

            if (!verifyToken) {
                setVerificationStatus('pending')
                setMessage('Link de verificación inválido. Por favor, revisa tu email y vuelve a intentar.')
                return
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_URL_API}/api/users/verify?verify_token=${verifyToken}`)
                const data = await response.json()

                if (data.ok) {
                    setVerificationStatus('success')
                    setMessage('¡Tu email ha sido verificado con éxito! Ahora puedes iniciar sesión.')
                } else {
                    setVerificationStatus('pending')
                    setMessage(data.message || 'Por favor revisa tu correo y haz clic en el link para confirmar tu email.')
                }
            } catch (error) {
                console.error('Error durante la verificación:', error)
                setVerificationStatus('pending')
                setMessage('Ocurrió un error durante la verificación. Por favor, intenta más tarde.')
            }
        }

        // Llamamos a la función de verificación al cargar la pantalla
        verifyEmail()

        // Este useEffect se encargará de verificar automáticamente cada 2 segundos
        const interval = setInterval(() => {
            // Verificamos nuevamente el token
            verifyEmail()
        }, 2000) // Cada 2 segundos






        // Limpiamos el intervalo cuando el componente se desmonte
        return () => clearInterval(interval)
    }, [searchParams]) // Se ejecuta cuando cambia el parámetro de búsqueda

    useEffect(() => {
        if (verificationStatus === 'success') {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        navigate('/login') // Redirige al login cuando llega a 0
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [verificationStatus, navigate])

    const handleGoToLogin = () => navigate('/login')

    // Estilos básicos para que se vea bien sin CSS externo
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '2rem',
    }

    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '400px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }

    const buttonStyle = {
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    }

    if (verificationStatus === 'loading') {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h2>Verificando tu email...</h2>
                    <p>Por favor espera mientras confirmamos tu dirección de correo.</p>
                </div>
            </div>
        )
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {verificationStatus === 'success' ? (
                    <>
                        <h2>¡Email verificado con éxito!</h2>
                        <p>{message}</p>
                        <button
                            onClick={handleGoToLogin}
                            style={{ ...buttonStyle, backgroundColor: '#4caf50', color: '#fff' }}
                        >
                            Ir al Login Ahora
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#555' }}>
                            Redirigiendo al login en {countdown} segundos...
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Esperando verificación...</h2>
                        <p>{message || "Por favor revisa tu correo y haz clic en el link para confirmar tu email."}</p>
                        <button
                            onClick={handleGoToLogin}
                            style={{ ...buttonStyle, backgroundColor: '#2196f3', color: '#fff' }}
                        >
                            Ir al Login
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default EmailVerificationScreen
