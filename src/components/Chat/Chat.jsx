//manejamos la lista de mensajes.

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllMessagesByChannelId } from "../../services/messagesService"

const Chat = () => {
    const [messages_response, setMessagesResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { channel_id, workspace_id } = useParams()

    const loadMessages = async () => {
        try {
            setLoading(true)
            const data = await getAllMessagesByChannelId({ channel_id: channel_id, workspace_id: workspace_id })

            setMessagesResponse(data)

        }
        catch (error) {
            console.log('error al obtener mensajes', error)
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadMessages()
    }, [channel_id]) //cada vez que cambie de canal, se cargan los mensajs de ese canal.
    console.log(messages_response)
    return (
        <div>
            <h1>Chat</h1>
            {
                messages_response.data.messages.map((message) =>
                    <div key={message._id}>
                        <b>Emisor : {message.user.name}</b>
                        <p> {message.content} </p>
                    </div>
                )

            }
        </div>
    )
}
export default Chat