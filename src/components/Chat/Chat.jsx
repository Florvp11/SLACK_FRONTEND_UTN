import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllMessagesByChannelId, createNewMessage } from "../../services/messagesService"
import './Chat.css'

const Chat = () => {
    const [messages_response, setMessagesResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [content, setContent] = useState('') // Estado del textarea

    const { channel_id, workspace_id } = useParams()

    const loadMessages = async () => {
        try {
            setLoading(true)
            const data = await getAllMessagesByChannelId({ channel_id, workspace_id })
            setMessagesResponse(data)
        } catch (error) {
            console.log('Error al obtener mensajes:', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMessages()
    }, [channel_id])

    const handleChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (content.trim() === '') return // evitamos enviar mensajes vacíos

        try {
            await createNewMessage({ channel_id, workspace_id, content })
            setContent('') // Limpiamos el textarea
            loadMessages() // Recargamos los mensajes después de enviar
        } catch (error) {
            console.error('Error al enviar mensaje:', error)
        }
    }

    if (loading) return <p>Cargando mensajes...</p>
    if (error) return <p>Error al cargar los mensajes: {error.message}</p>

    return (
        <div className="chat-container">
            <h1>Chat</h1>

            <div className="messages">
                {messages_response?.data?.messages?.length === 0 ? (
                    <p>No hay mensajes en este canal.</p>
                ) : (
                    messages_response.data.messages.map((message) => (
                        <div key={message._id}>
                            <b>Emisor: {message.user.name}</b>
                            <p>{message.content}</p>
                        </div>
                    ))
                )}
            </div>

            <form className="text-area" onSubmit={handleSubmit}>

                <textarea
                    name="content"
                    id="content"
                    value={content}
                    onChange={handleChange}
                    placeholder="Escribe un mensaje..."
                />
                <button className="send-button" type="submit">Enviar</button>
            </form>
        </div>
    );

}

export default Chat
