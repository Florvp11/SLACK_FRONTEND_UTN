import ENVIRONMENT from "../constants/environment"
import LOCALSTORAGE_KEYS from "../constants/localStorage"
import methods_http from "../constants/methodsHTTP"

export const getAllMessagesByChannelId = async ({ channel_id, workspace_id }) => {
    try {
        const authToken = localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken)
        const serverResponse = await fetch(ENVIRONMENT.URL_API + `/api/messages/${workspace_id}/${channel_id}`,
            {
                method: methods_http.GET,
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            })
        const data = await serverResponse.json()
        return data
    }
    catch (error) {
        console.log('error al obetener la lista de mensajes', error)
        throw error
    }

}
export const createNewMessage = async ({ channel_id, workspace_id, content }) => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken)
        const server_response = await fetch(ENVIRONMENT.URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methods_http.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify({
                content
            })
        })
        const data = await server_response.json()
        return data
    }
    catch (error) {
        console.error('Error al crear mensajes', error)
        throw error
    }
}