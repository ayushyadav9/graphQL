const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors())

mongoose.connect(process.env.DBURI)
mongoose.connection.once('open',()=>{
    console.log("Database Connected")
})

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.use('/hello',(req,res)=>{
    res.send("ekk")
})

app.listen(5000,()=>{
    console.log("Listining on port 5000");
})