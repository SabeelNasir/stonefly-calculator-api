import express, { Router } from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import helmet from "helmet";
import cors from "cors";
import { checkJwt } from "./middlewares/access-rules/CheckJwt";
import { AppConstants } from "./config/AppConstants";
import session from 'express-session'

// Create Express server    
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(`${__dirname}/swagger.yaml`);
const fileupload = require("express-fileupload");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Express configuration
app.use(fileupload());
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(express.static('../uploads'));
app.use(helmet());
app.use(cors(AppConstants.corsOptions));
app.use(session(AppConstants.sessionOptions))
app.use(bodyParser.urlencoded({ extended: true }));
const router = Router()
let routes = new Routes().routes(router);
app.use('/api', routes)
export default app;
