import config from './config'

export default async function getTodos(path){
    const response = await fetch(`${config.url}/todos/${path}`, {
        headers: {
            'Authorization': `Bearer ${await config.getToken()}`
        }
    });
    const data = await response.json();
    return data;
}