const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';
const cors = require('cors')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mongod = require('mongoose');
mongod.connect('mongodb://localhost:27017/crud');

app.use(cors());
const routes=require('./routes/crudRoute');
app.use(routes);


app.listen(3000 ,()=>{console.log('port is running on 3000');
});