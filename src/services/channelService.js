import ENVIRONMENT from "../constants/environment"
import LOCALSTORAGE_KEYS from "../constants/localStorage"
import methods_http from "../constants/methodsHTTP"

export const getChannels = async ({ workspace_id }) => {
    try {
        const serverRespone = await fetch(
            `${ENVIRONMENT.URL_API}/api/channels/${workspace_id}`,
            {
                method: methods_http.GET,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken)}`
                }
            }
        )
        const data = await serverRespone.json()
        return data
    }
    catch (error) {
        console.error('error al obtener canales ', error)
        throw error
    }


}
export const createChannel = async ({ name, workspace_id }) => {

    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken);
        const server_response = await fetch(`${ENVIRONMENT.URL_API}/api/channels/${workspace_id}`, {
            method: methods_http.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify({ name })
        });

        const data = await server_response.json();
        return data;
    } catch (error) {
        console.error('error al crear canales', error);
        throw error;
    }
};
