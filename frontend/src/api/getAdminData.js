import config from "./config"

export default async function getAdminData(){
    try{
        let response = await fetch(`${config.host}/admin/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await config.getToken()}`
            }
        })
        let data = await response.json()
        return data
    }catch(error){
        console.log(error)
        return {
            message: 'Something went wrong'
        }
    }
}