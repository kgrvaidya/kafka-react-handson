// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive

const { Kafka } = require("kafkajs")
const KafkaScheme = require('./model')


const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "message-log"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })

const consumer = kafka.consumer({ groupId: clientId })


const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			console.log('received message', JSON.parse(message.value))
			// here, we just log the message to the standard output
			saveMessage(JSON.parse(message.value))
			// .then((console.log('saved')))
			// .catch((err) => console.log('error'))
		},
	})
}

const saveMessage = async (message) => {

	try {
		let data = new KafkaScheme({
			ticketNo : message.ticketNo,
			color : message.color
		})

		await data.save()
		console.log('saved ', data.ticketNo)
	}
	catch (err) {
		console.log('Error while saving ', err)
	}

}

module.exports = consume