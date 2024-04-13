import express from 'express';
import bodyParser from "body-parser";
import db from './config.js';  
import cors from "cors";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello from express!"));

app.listen(port, () => console.log(`Server is listening on port: http://localhost:${port}`));

