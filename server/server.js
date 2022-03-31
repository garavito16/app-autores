const express = require('express');
const cors = require('cors');

const app = express();
require('./config/config.mongoose');
const AutorRouter = require('./routes/autor.routes');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/autor',AutorRouter);

app.listen(8000,()=>{
    console.log("el servidor corre en el puerto 8000");
})