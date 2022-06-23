import config from './config'

export default async function(_id){
    try{
        let task = await fetch(`${config.url}/tasks/delete/${_id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await config.getToken()}`
            }
        })
        return task
    }catch(e){
        console.log(e)
        return null
    }
}