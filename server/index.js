//Imports - Requires
const express = require("express");
const app = express();
const cors = require("cors");
const patientRoute = require("./routes/patientRoute");

//Cors options for safety allowing POST and GET req only from a specific URL
const corsOptions = {
  origin: process.env.FONTEND_URL,
  methods: "GET, POST",
  optionsSuccessStatus: 200,
};

//Midlleware
//Calls Cors
app.use(cors(corsOptions));
//req.body
app.use(express.json());

//use patient route
app.use(patientRoute);

//Initialize server
app.listen(process.env.PORT, () => {
  console.log("server has started, listening for requests.");
});
