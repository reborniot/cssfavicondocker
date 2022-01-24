require('dotenv').config();

const port = '3000';
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});