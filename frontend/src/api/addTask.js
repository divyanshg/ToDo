import config from './config'

export default async function(task){
    try{
        await fetch(`${config.url}/tasks/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${await config.getToken()}`
            },
            body: JSON.stringify(task)
        })
        return true
    }catch(error){
        alert("Something went wrong while adding your task.")
        return false
    }
}