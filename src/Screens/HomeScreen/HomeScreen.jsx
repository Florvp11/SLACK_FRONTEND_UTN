import React, { useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../services/workspaceService.js';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const getWorkspaces = async () => {
        try {
            setLoading(true);
            const data = await getAllWorkspaces();
            console.log('la data', data)
            setResponse(data)
        }
        catch (error) {
            console.error('error al obtener workspaces', error)
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(
        () => {
            getWorkspaces();
        }, []
    )

    return (
        <div>
            <header>
                <h1>Tus espacios de trabajo</h1>
                <Link to={'/new'} className='newWorkspace'>
                    Crear espacio de trabajo
                </Link>
            </header>
            <div className='grid-container'>
                {
                    loading
                        ? <h2>Cargando...</h2>
                        : <div className='gridWorkspaces'>
                            {
                                response.data.workspaces
                                    .filter((element) => element.workspace !== null)
                                    .map(
                                        (element) => {
                                            return (
                                                <Link to={'/workspaces/' + element.workspace._id} className='cardWorkspaces'>
                                                    <div key={element.workspace._id} >
                                                        <h2>{element.workspace.name}</h2>
                                                        <b>Ir a espacio de trabajo</b>
                                                    </div>
                                                </Link>
                                            )
                                        }

                                    )
                            }
                        </div>
                }
            </div>

        </div>
    )

}

export default HomeScreen
