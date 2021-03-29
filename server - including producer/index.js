const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')


//Initialize express app
const app = express();
app.use(bodyParser.urlencoded({extended: false}))

// let connectionString = `mongodb+srv://kgrvaidya:kgrvaidya123@cluster0.kykmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
let connectionString = 'mongodb://localhost/myapp'
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log('connected to db')})
.catch((error) => { console.log(error) })

const KafkaScheme = require('./model');


const produce = require("./produce")
const consume = require("./consume");

// call the `produce` function and log an error if it occurs
produce().catch((err) => {
	console.error("error in producer: ", err)
})

// start the consumer, and log any errors
consume().catch((err) => {
	console.error("error in consumer: ", err)
})


//Initialize the sever

app.use(cors({
  origin : 'http://localhost:3000',
  credentials : true
}))


app.get('/api/getData', (req,res,next) => {
	// console.log('request made to fetch data')
	// res.send('Hello')
	KafkaScheme.find().sort({ _id: -1 }).limit(10)
	.then((data) => {
		res.send(data)
	})
	.catch((err) => res.status(500).send('Error : ',err))

})


app.listen(4000, () => {
    console.log('sever listening on port:4000');
});