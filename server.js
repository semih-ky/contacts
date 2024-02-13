const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");

const stage = process.env.NODE_ENV || "dev";
require("dotenv").config({ path: path.join(__dirname, `.env.${stage}`) });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
  
app.use(bodyParser.json());
app.use(routes);

const port = process.env.SERVER_PORT; 
app.listen(port, () => {
  console.log(`Server runs at port: ${port}`);
})