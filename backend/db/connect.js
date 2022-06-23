const mongoose = require("mongoose")

function connectToDatabase(){
    console.log("Connecting to database...")
    return new Promise(async (resolve, reject) => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = connectToDatabase