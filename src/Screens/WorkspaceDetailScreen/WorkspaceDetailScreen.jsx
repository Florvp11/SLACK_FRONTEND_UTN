import React, { useEffect, useState } from 'react'
import { getChannels, createChannel } from '../../services/channelService'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import SidebarChannels from '../../components/SidebarChannels/SidebarChannels'
import Chat from '../../components/Chat/Chat'
import Sidebar from '../../components/SideBar/SideBar';
import './WorkspaceDetailScreen.css'
import { deleteWorkspace } from '../../services/workspaceService.js';
import { IoMdTrash } from "react-icons/io";

const WorkspaceDetailScreen = () => {
    const [channels_response, setChannelsResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { workspace_id, channel_id } = useParams()
    const navigate = useNavigate()

    const loadChannels = async () => {
        try {
            setLoading(true)
            const data = await getChannels({ workspace_id })
            setChannelsResponse(data)
        } catch (error) {
            console.log('error al obtener canales', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadChannels()
    }, [workspace_id])

    const handleCreateChannel = async (channelName) => {
        try {
            // Espero que createChannel devuelva { channel, channels }
            const response = await createChannel({ workspace_id, name: channelName })

            // Actualizo la lista completa con la que manda el backend
            setChannelsResponse(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    channels: response.data.channels
                }
            }))

            // Navego al canal recién creado para evitar URL con undefined
            navigate(`/workspaces/${workspace_id}/channels/${response.data.channel._id}`)

        } catch (error) {
            console.error('Error creando canal:', error)
            throw new Error('No se pudo crear el canal, intente nuevamente')
        }
    }
    const handleDeleteWorkspace = async () => {
        const confirmDelete = window.confirm('¿Querés eliminar este workspace? Esta acción no se puede deshacer.')
        if (!confirmDelete) return;

        try {
            await deleteWorkspace({ workspace_id })
            alert('Workspace eliminado con éxito')
            // Redirigir a pantalla principal
            navigate('/home')
        } catch (error) {
            alert('Error al eliminar workspace')
            console.error(error)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    // Si no hay canal seleccionado y hay canales, navego al primero
    if (!loading && channels_response) {
        if (!channel_id && channels_response.data.channels.length > 0) {
            return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />
        }
    }

    return (
        <div className="workspace-layout">

            <Sidebar />
            <div className="channels-and-chat">


                <div className="channels-sidebar">

                    {!loading && channels_response && (
                        <SidebarChannels
                            channels={channels_response.data.channels}
                            onCreateChannel={handleCreateChannel}
                        />
                    )}
                    <button
                        onClick={handleDeleteWorkspace}
                        className='delete-btn'
                        title="Eliminar workspace"
                    >
                        <IoMdTrash size={30} />

                    </button>
                </div>
                <div className="chat-area">
                    {channel_id &&
                        !loading &&
                        channels_response &&
                        channels_response.data.channels.length > 0 && (
                            <Chat />
                        )}
                </div>
            </div>
        </div>
    );
}

export default WorkspaceDetailScreen
