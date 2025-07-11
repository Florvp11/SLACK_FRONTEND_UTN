import React, { useEffect, useState } from 'react'
import { getChannels } from '../../services/channelService'
import { Navigate, useParams } from 'react-router-dom'
import SidebarChannels from '../../components/SidebarChannels/SidebarChannels'
import Chat from '../../components/Chat/Chat'





const WorkspaceDetailScreen = () => {
    const [channels_response, setChannelsResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { workspace_id, channel_id } = useParams()

    const loadChannels = async () => {
        try {
            setLoading(true)
            const data = await getChannels({ workspace_id: workspace_id })
            setChannelsResponse(data)

        }
        catch (error) {
            console.log('error al obtener canales', error)
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadChannels()
    }, [])
    console.log(channels_response)

    //si no esta cargando y hay canales
    if (!loading && channels_response) {
        if (!channel_id && channels_response.data.channels.length > 0) {
            //redirijo al priemr canal
            return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />

        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Tus canales del wkps</h1>
            {
                !loading && channels_response && <SidebarChannels channels={channels_response.data.channels} />
            }
            {
                channel_id &&
                !loading &&
                channels_response &&
                channels_response.data.channels.length > 0 &&
                <Chat />
            }


        </div>
    )

}

export default WorkspaceDetailScreen








