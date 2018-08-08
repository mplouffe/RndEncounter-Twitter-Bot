require('./config/config');
const Twitter = require('twitter');
const { generateTextTweet } = require('./text-tweet-generator/tweet-generator');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

setInterval(() => {
    generateTextTweet()
        .then((status) => {
            return client.post('statuses/update', { status: status });
        })
        .then((tweet) => {
            console.log('Successful tweet!')
        })
        .catch((err) => {
            console.log('ERR!: ', err);
        });
}, 28800000);
