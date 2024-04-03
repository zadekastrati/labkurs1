import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());

app.listen(8080, ()=>{
    console.log("Listening");
})