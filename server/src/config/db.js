const mongoose = require("mongoose");

async function connectDB() {
    try {
        // const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.oejsl.mongodb.net/test?authSource=admin&replicaSet=atlas-10zo2g-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
        const uri = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
