const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const MongoConnection = require('./config.js');

MongoClient.connect(MongoConnection.mongo.connection, {
    useUnifiedTopology: true })
    .then( client => {

        console.log("Connection to scarifdb established.");

        const db = client.db('star-wars-quotes');
        const quotes = db.collection('quotes');

        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({ extended: true}));
        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.listen(3000, function () {
            console.log('Listening on port 3000');
            console.log('The server is up!');
        });

        // Fix: Unresolved function or method get()
        app.get('/', (request, response) => {

            quotes.find().toArray()
                .then(result => {
                    response.render('index.ejs', { quotes: result });
                    // console.log(result);
                })
                .catch(error => console.error(error));
            console.log("Current directory: " + __dirname);
        });
        app.post('/quotes', (request, response) => {
            quotes.insertOne(request.body)
                .then(result => {
                    response.redirect("/");
                })
                .catch(error => console.error(error))
        });
        app.put('/quotes', (request, response) => {
            quotes.findOneAndUpdate(
                { name: "Yoda"},
                { $set:
                        {
                            name: request.body.name,
                            quote: request.body.quote
                        }
                },
                {upsert: true}
            )
            .then(result => {
                response.json('Success');
            }).catch(error => console.log(error));
        });
        app.del('/quotes', (request, response) => {
            quotes.deleteOne(
                {name: request.body.name}
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return response.json('No More Vader');
                    }
                    response.json('Deleted Vader');
                })
                .catch(error => console.log(error));
        })
    })
    .catch( error => { console.error(error) });