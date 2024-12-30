import express  from 'express'
import morgan from 'morgan';
import connect from './db/db.js';

connect();


const app = express()

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    console.log("Hello")
})



export default app;