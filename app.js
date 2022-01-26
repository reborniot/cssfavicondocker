require('dotenv').config();

const port = 'app.sock';
const hostname = 'cssfavicon.tk';

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

require("./app/routes/favicon.routes")(app);
app.listen((port, hostname, () => {
  console.log(`Server is running on port ${port}.`);
});
