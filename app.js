require('./config/config');
const Twitter = require('twitter');
const { generateTextTweet } = require('./text-tweet-generator/tweet-generator');

const eightHours = 28800000;
const fiveSeconds = 5000;

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


client.post('statuses/update', {status: 'Rnd Encounter is up and running!'})
    .then((tweet) => {
        console.log("Success");
        console.log(tweet);
    })
    .catch((err) => {
        console.log('Error!');
        console.log(err);
    });


setInterval(() => {
    const status = generateTextTweet();
    client.post('status/update', { status })
}, fiveSeconds);
