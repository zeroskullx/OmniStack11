const express = require("express");

const OngController = require("./controllers/Ongs");
const IncidentController = require("./controllers/Incidents");
const OngProfileController = require("./controllers/OngProfile");
const SessionsController = require("./controllers/Sessions");

const routes = express.Router();

//Login
routes.post("/sessions", SessionsController.create);

//Lista ongs
routes.get("/ongs", OngController.index);
//Cria uma Ong
routes.post("/ongs", OngController.create);

//Profile
routes.get("/profile", OngProfileController.index);

//Lista incidents
routes.get("/incidents", IncidentController.index);
//Cria incidents
routes.post("/incidents", IncidentController.create);
//Deleta incidents
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
