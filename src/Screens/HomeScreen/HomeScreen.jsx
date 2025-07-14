import React, { useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../services/workspaceService.js';
import { Link, useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import Sidebar from '../../components/SideBar/SideBar';

const HomeScreen = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getWorkspaces = async () => {
        try {
            setLoading(true);
            const data = await getAllWorkspaces();
            console.log('la data', data);
            setResponse(data);
        } catch (error) {
            console.error('error al obtener workspaces', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWorkspaces();
    }, []);



    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <h2 className='title'> Tus Workspaces</h2>

                {loading ? (
                    <h2>Cargando...</h2>
                ) : response.data.workspaces.filter((element) => element.workspace !== null).length === 0 ? (
                    <div className="no-workspaces">
                        <p>No tenés ningún workspace todavía.</p>
                        <button onClick={() => navigate('/new')} className="btn-create">
                            Comenzar
                        </button>
                    </div>
                ) : (
                    <div className='gridWorkspaces'>
                        {response.data.workspaces
                            .filter((element) => element.workspace !== null)
                            .map((element) => (
                                <Link
                                    to={'/workspaces/' + element.workspace._id}
                                    className='cardWorkspaces'
                                    key={element.workspace._id}
                                >
                                    <div>
                                        <h2>{element.workspace.name}</h2>
                                    </div>
                                </Link>
                            ))}
                    </div>
                )}
            </main>

        </div>
    );

};

export default HomeScreen;
