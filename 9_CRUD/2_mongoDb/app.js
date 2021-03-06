var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var app = express()

var port = process.env.PORT || 3002

// Import Routes
var userRouter = require('./Routes/user.routes')
var taskRouter = require('./Routes/task.routes')

// Import Models
var User = require('./models/user.model')
var Task = require('./models/task.model')

// Enable MongoDb Debuging
mongoose.set('debug', true)

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://sa:sa1234#@ds143893.mlab.com:43893/my-todo-app', { useNewUrlParser: true })
// mongodb://localhost/todoApp
// mongodb://sa:sa1234@#@ds143893.mlab.com:43893/my-todo-app

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// logs all the requests to the console
app.use(morgan('short'))

// Register Routes
userRouter(app)
taskRouter(app)

// Set Default Route.
app.get('/', function (req, res) {
  res.send('<h1>Welcome to NodeJS Training : Mongodb Integration!</h1>')
})

// Start listining on port for incomining client requests
app.listen(port, function () {
  console.log('Application started on PORT: ' + port)
})
