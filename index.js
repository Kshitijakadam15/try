const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
require("./src/db/db.js");
const dotenv = require("dotenv");
// const path = require("path");

const userRoutes = require("./src/routes/user.js");

const app = express();
app.use(cors());
dotenv.config();
const server = http.createServer(app);

// Enable BODY PARSER for all requests to parse the body data of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", userRoutes);

// Server listening to port 3000
server.listen(process.env.PORT, () => {
  console.log("Listening on Port 3000 !!");
});
