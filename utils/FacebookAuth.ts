import { LoginResult, GraphRequest, GraphRequestManager } from "react-native-fbsdk"

import { dispatchGlobalState } from "../state"
import Axios from "axios"
import { GRCGDS_BACKEND } from "react-native-dotenv"

export const handlePermissionPromt = (result: LoginResult) => {
    //@ts-ignore
    if (result.declinedPermissions.includes("email")) {
        dispatchGlobalState({ type: 'error', state: 'You must authorize the use of email' })
        throw new Error('You must authorize the use of email')
    }

    return result
}

export const handleUserData = () => {
    console.log('handleUserData')
    return new Promise((resolve, reject) => {
        // Create a graph request asking for user information with a callback to handle the response.
        const infoRequest = new GraphRequest(
            '/me',
            {
                parameters: {
                    'fields': {
                        'string': 'id,email,name'
                    }
                }
            },
            (error, result) => {
                if (error) {
                    dispatchGlobalState({ type: 'error', state: 'We could not fetch you Facebook data.' })
                    console.log('Error fetching data: ' + error.toString());
                    reject(error)
                } else {
                    const { email, id, name } = result
                    if (!email || !id || !name) {
                        dispatchGlobalState({ type: 'error', state: 'Some parameter is missing on your Facebook data.' })
                        reject("Missing parameters in Graph call")
                        return
                    }
                    Axios({
                        url: `${GRCGDS_BACKEND}/public/withFacebook`,
                        method: 'POST',
                        data: result
                    })
                        .then((res) => {
                            dispatchGlobalState({ type: 'token', state: res.data.token })
                            dispatchGlobalState({ type: 'profile', state: res.data })
                            resolve()
                        })
                        .catch((er) => {
                            reject(er)
                        })

                }
            },
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
    });
}