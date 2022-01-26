require('dotenv').config();

const {
	NODE_ENV,
	PORT,
	HOST,
} = process.env;

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
           
app.listen(PORT, () => {
	app.currentServer = {
		host: HOST ? HOST : "127.0.0.1",
		port: PORT,
	};
	console.log(`Server init on: http://:${PORT}`);
});
