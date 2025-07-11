import React, { useEffect, useState } from 'react'
import { getChannels, createChannel } from '../../services/channelService'
import { Link, Navigate, useParams } from 'react-router-dom'
import SidebarChannels from '../../components/SidebarChannels/SidebarChannels'
import Chat from '../../components/Chat/Chat'


const WorkspaceDetailScreen = () => {
    const [channels_response, setChannelsResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const { workspace_id, channel_id } = useParams()

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
            const newChannel = await createChannel({ workspace_id, name: channelName })

            // Actualizo la lista local para que se vea el canal nuevo al toque
            setChannelsResponse(prev => ({
                ...prev,
                data: {
                    ...prev.data,
                    channels: [...prev.data.channels, newChannel]
                }
            }))
        } catch (error) {
            console.error('Error creando canal:', error)
            throw error('No se pudo crear el canal, intente nuevamente')
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!loading && channels_response) {
        if (!channel_id && channels_response.data.channels.length > 0) {
            return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />
        }
    }


    return (
        <div>
            <h1>Tus canales del workspace</h1>
            <Link to={'/home'}>
                Volver a mis espacios de trabajo
            </Link>
            {!loading && channels_response && (
                <SidebarChannels
                    channels={channels_response.data.channels}
                    onCreateChannel={handleCreateChannel}
                />
            )}
            {channel_id &&
                !loading &&
                channels_response &&
                channels_response.data.channels.length > 0 && (
                    <Chat />
                )}
        </div>
    )

}
export default WorkspaceDetailScreen