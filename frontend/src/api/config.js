let user = "admin"

export default {
    url: "http://localhost:8080/api",
    user: user,
    host: "http://localhost:8080",
    getToken: async () => {
        return await localStorage.getItem('token')
    }
}