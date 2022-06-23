import config from "./config";

export default async function(_id, update) {
    try {
        await fetch(`${config.url}/tasks/update/${_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${await config.getToken()}`
            },
            body: JSON.stringify(update),
        })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}