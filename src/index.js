const express = require("express");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const expressConfig = require("./config/expressConfig.js");
const { port } = require("./constans.js");
const routes = require("./router.js");
const dbConnect = require("./config/dbConfig.js");

// local variables
const app = express();

// app configs
handlebarsConfig(app);
expressConfig(app);

// Connecting to DB
dbConnect()
  .then(() => console.log("Sucessfully connected to the database"))
  .catch((err) => console.log(err));

// Routing
app.use(routes);

app.listen(port, () => console.log(`Server is listening at port ${port}`));
