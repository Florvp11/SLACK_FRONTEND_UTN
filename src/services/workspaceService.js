import ENVIRONMENT from "../constants/environment"
import LOCALSTORAGE_KEYS from "../constants/localStorage.js"
import methods_HTTP from "../constants/methodsHTTP"

export const getAllWorkspaces = async () => { ///funcion que hace la conexion con el servidor para obtener la lista de WS
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspaces', {
            method: methods_HTTP.GET,
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        })
        const data = server_response.json() //obtenemos el body 
        return data
    }
    catch (error) {
        console.error(error)
        throw error
    }
}


export const createWorkspace = async (workspace) => {

    const { name, description } = workspace
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.authorizationToken)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspaces', {
            method: methods_HTTP.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify(
                {
                    name: name,
                    description: description
                }
            )
        })
        const data = server_response.json()
        return data
    }
    catch (error) {
        console.error(error)
        throw error
    }
}