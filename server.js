const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const path = require("path");
const connectDB = require('./config/dbConnections');

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
