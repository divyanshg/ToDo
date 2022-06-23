import config from "./config";

export default async function getToken(){
    try{
        const response = await fetch(config.host+'/get_token/'+ config.user);
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.token;
    }catch(err){
        console.log(err);
    }
}