require('./config/config');
const express = require('express');
const Twitter = require('twitter');
const { generateTextTweet } = require('./text-tweet-generator/tweet-generator');

const app = express();
const PORT = process.env.PORT;

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.post('statuses/update', {status: 'RndEncounter is up and running.'})
    .then(() => {
        console.log('Success!');
    })
    .catch((err) => {
        console.log('ERR: ', err);
    });

setInterval(() => {
    generateTextTweet()
        .then((status) => {
            return client.post('statuses/update', { status: status });
        })
        .then((tweet) => {
            // console.log('Successful tweet!')
        })
        .catch((err) => {
            console.log('ERR!: ', err);
        });
}, 28800000);

app.listen(PORT, () => console.log(`Rnd Encounter up and running on ${PORT}`));
