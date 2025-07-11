import { Link } from 'react-router-dom'
import React from 'react'
const SidebarChannels = ({ channels }) => {

    return (
        <aside>
            <nav>
                {
                    channels.length > 0
                        ? channels.map((channel) => {
                            return (
                                <React.Fragment key={channel._id} >
                                    <Link

                                        to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}
                                    >
                                        {channel.name}
                                    </Link>
                                    <br />
                                </React.Fragment>

                            )
                        })
                        : <p>No hay canales</p>
                }
            </nav>
        </aside>
    )
}

export default SidebarChannels