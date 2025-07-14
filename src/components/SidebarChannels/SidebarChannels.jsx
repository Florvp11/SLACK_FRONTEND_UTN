import { NavLink } from 'react-router-dom'
import React, { useState, useMemo } from 'react'
import './SidebarChannels.css'
import { FaPlus } from "react-icons/fa";

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
        <aside className='container'>
            <div className='top'>
                <input
                    className='search-bar'
                    type="text"
                    placeholder="Buscar canales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button className="btn-new-channel" onClick={handleCreateClick} title='NuevoCanal'>
                    <FaPlus size={16} />
                </button>

                {isCreating && (
                    <div className="modal-screen">
                        <div className="modal">
                            <h3>Crear nuevo canal</h3>
                            <form className='create-channel-form' onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Nombre del nuevo canal"
                                    value={newChannelName}
                                    onChange={(e) => setNewChannelName(e.target.value)}
                                    className='modal-input'
                                />
                                <div className="modal-buttons">
                                    <button type="submit">Crear</button>
                                    <button type="button" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <nav>
                {filteredChannels.length > 0 ? (
                    filteredChannels.map(channel => (
                        <div key={channel._id}>
                            <NavLink
                                to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}
                                onClick={() => setSearchTerm('')} // limpio la barra de bsuqueda
                                className={({ isActive }) =>
                                    isActive ? 'link active' : 'link'
                                }
                            >
                                ❀ {channel.name}
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <p>No hay canales que coincidan</p>
                )}
            </nav>

        </aside >
    )
}

export default SidebarChannels
