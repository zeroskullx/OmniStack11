const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/Ongs");
const IncidentController = require("./controllers/Incidents");
const OngProfileController = require("./controllers/OngProfile");
const SessionsController = require("./controllers/Sessions");

const routes = express.Router();

//Login
routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  SessionsController.create
);

//Lista ongs
routes.get("/ongs", OngController.index);

//Cria uma Ong
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.create
);

//Profile
routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  OngProfileController.index
);

//Lista incidents
routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);

//Cria incidents
routes.post(
  "/incidents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number()
        .required()
        .min(1)
    })
  }),
  IncidentController.create
);

//Deleta incidents
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;
