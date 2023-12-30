const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB connection successful");
})
.catch((err) => {
    console.error("Error connecting to the database:", err.message);
});

app.use(cors());
app.use(express.json());
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at Port ${process.env.PORT}`);
});
