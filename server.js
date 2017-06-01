var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
// aws
var aws = require('aws-sdk')
var queueUrl = ''
var receipt = ''


aws.config.loadFromPath(__dirname + '/key.json')
var sqs = new aws.SQS()


app.use(cors())
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
	res.send({ sellsuki: 'i love sellsuki'})
})

app.get('/create', function (req, res) {
    var params = {
        QueueName: 'firstQueue'
    }
    sqs.createQueue(params, function (err, data) {
        if (err) res.send(err)
        else res.send(data)
    })
})


app.get('/send', function (req, res) {
    var params = {
        MessageBody: 'Hello world!',
        QueueUrl: queueUrl,
        DelaySeconds: 0
    }
    sqs.sendMessage(params, function (err, data) {
        if (err) res.send(err)
        else res.send(data)
    })
})

app.get('/list', function (req, res) {
    sqs.listQueues(function (err, data) {
        if (err) res.send(err)
        else res.send(data)
    })
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})