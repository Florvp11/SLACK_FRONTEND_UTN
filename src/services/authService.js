import ENVIRONMENT from "../constants/environment";
import methods_http from "../constants/methodsHTTP";

//envio los datos a la API. con fetch. 

export const login = async ({ email, password }) => {
    try {
        const serverResponse = await fetch(`${ENVIRONMENT.URL_API}/api/users/login`, {
            method: methods_http.POST,
            headers: {
                "Content-Type": "application/json" // necesario para que el backend entienda JSON
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const serverData = await serverResponse.json();
        console.log("Respuesta del servidor:", serverData); //puedo empezar a manipular los datos del back.
        return serverData;
    }
    catch (error) {
        console.error("Error en el login:", error);
        throw {
            message: "Error al conectar con el servidor",
        }
    }
}

export const register = async ({ name, email, password }) => {
    try {
        const serverResponse = await fetch(`${ENVIRONMENT.URL_API}/api/users/register`, {
            method: methods_http.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        const serverData = await serverResponse.json();
        return serverData;
    } catch (error) {
        throw { message: "Error al conectar con el servidor" };
    }
};

export const verifyEmail = async (verify_token) => {
    try {
        // Asumo que tu backend usa método POST para la verificación, si es GET,
        // solo cambia método y cómo pasás el token (en query o body).
        const serverResponse = await fetch(
            `${ENVIRONMENT.URL_API}/api/users/verify-email?verify_token=${encodeURIComponent(verify_token)}`,
            {
                method: methods_http.GET,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const serverData = await serverResponse.json();

        if (!serverResponse.ok) {
            // Lanzamos error con mensaje del backend si status no es ok
            throw new Error(serverData.message || "Error al verificar el email");
        }

        return serverData; // esperado { ok: true, message: "...", etc }
    } catch (error) {
        console.error("Error en verifyEmail service:", error);
        throw { message: error.message || "Error al conectar con el servidor" };
    }
};