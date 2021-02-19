const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const MongoConnection = require('./config.js');
const bodyParser = require('body-parser');
app.set('view-engine', 'ejs');

MongoClient.connect(MongoConnection.mongo.connection, {
    useUnifiedTopology: true
})
    .then(client => {


        const db = client.db('doomdb');
        const rhymes = db.collection('rhymes');
        console.log("Connection to doomdb established.");

        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(express.static(__dirname + '/public/'));

        app.get('/', (request, response) => {

            rhymes.find().toArray()
                .then(result => {
                    response.render('index.ejs', {rhymes: result});
                    console.log(result);
                })
                .catch(error => console.error(error));
            // console.log("Current directory: " + __dirname);
        });

        app.post('/rhymes', (request, response) => {
            rhymes.insertOne(request.body)
                .then(result => {
                    response.redirect("/");
                })
                .catch(error => console.error(error))
        });

        app.del('/rhymes', (request, response) => {
            rhymes.deleteOne(
                {name: request.body.name}
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return response.json('No more videos to delete');
                    }
                    response.json('Deleted video');
                })
                .catch(error => console.log(error));
        });

        app.listen(3000, function () {
            console.log('Listening on port 3000');
            console.log('The server is up!');
        });
    })
    .catch(error => {
        console.error(error)
    });