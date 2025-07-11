import { Link } from 'react-router-dom'
import React, { useState, useMemo } from 'react'

const SidebarChannels = ({ channels, onCreateChannel }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [newChannelName, setNewChannelName] = useState('')

    const filteredChannels = useMemo(() => {
        if (!searchTerm.trim()) return channels || []
        return (channels || []).filter(channel =>
            channel.name.toLowerCase().includes(searchTerm.toLowerCase()) //no importa si es mayusc. o minusc.
        )
    }, [channels, searchTerm])

    const handleCreateClick = () => setIsCreating(true)

    const handleCancel = () => {
        setIsCreating(false)
        setNewChannelName('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newChannelName.trim() === '') {
            throw error('El nombre del canal no puede ser vacío')

        }
        onCreateChannel(newChannelName.trim())
        setNewChannelName('')
        setIsCreating(false)
    }

    return (
        <aside>
            <input
                type="text"
                placeholder="Buscar canales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

            />

            {isCreating ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre del nuevo canal"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        autoFocus

                    />
                    <button type="submit" >Crear</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </form>
            ) : (
                <button onClick={handleCreateClick}>
                    + Nuevo Canal
                </button>
            )}
            <nav>
                {filteredChannels.length > 0 ? (
                    filteredChannels.map(channel => (
                        <div key={channel._id}>
                            <Link
                                to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}
                                onClick={() => setSearchTerm('')} // limpio la barra de bsuqueda
                            >
                                {channel.name}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No hay canales que coincidan</p>
                )}
            </nav>

        </aside>
    )
}

export default SidebarChannels
