const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.BD_CONNECTION, {
            useNewUrlParser: true,
            useFindAndModify: false,    
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log("Suscessfull MongoDB conection")
    } catch (err) {
        console.log('Failed to connect to MongoDB: ', err)
        throw new Error("Failed to connect to MongoDB");
    }
}

module.exports = {dbConnection}