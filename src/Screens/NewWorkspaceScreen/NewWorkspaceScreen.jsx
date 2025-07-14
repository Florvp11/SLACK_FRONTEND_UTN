import React, { useEffect, useState } from 'react'
import { createWorkspace } from '../../services/workspaceService'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/SideBar/SideBar';

const NewWorkspaceScreen = () => {
    const navigate = useNavigate()

    // Estado del formulario
    const initial_form_state = {
        name: '',
        description: ''
    }
    const [form_state, setFormState] = useState(initial_form_state)

    // Estados de carga, error y respuesta
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

    // Manejador de envío de formulario
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            setError(null)
            const data = await createWorkspace(form_state)
            setResponse(data)
            setFormState(initial_form_state) // Reset del form
        } catch (err) {
            console.error('Error al crear workspace', err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    // Manejador de cambios en el formulario
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // Navegación si se creó correctamente
    useEffect(() => {
        if (response && !loading && response.ok) {
            navigate(`/home`)
        }
    }, [response])

    return (
        <div className="app-layout">
            <Sidebar />

            <div className="main-content">
                {loading ? (
                    <span>cargando...</span>
                ) : (
                    <>
                        <h1>Crear espacio de trabajo</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='name'>Nombre</label>
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={form_state.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <button>Crear workspace</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>Hubo un error: {error.message}</p>}
                    </>
                )}
            </div>
        </div>
    );

}

export default NewWorkspaceScreen
