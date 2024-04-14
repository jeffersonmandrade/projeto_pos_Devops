const express = require('express')
let app = express()
const promClient = require('prom-client');

let routes = require('./routes')
let env = process.env.NODE_ENV;
if(!env){
	env = 'development'
}

let config = require(`./config/config.${env}.json`);

require('./config/database')(`mongodb://${config.databaseConfig.host}:27017/${config.databaseConfig.database}`)

const port = process.env.port || 4000


app.use(express.static("public"))

app.use(routes)


app.listen(port, () =>{
     console.log('Server initialiazed on port ' + port) 
})