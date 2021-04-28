const NodeGeocoder = require('node-geocoder');

const options = {
    // provider: process.env.GEOCODER_PROVIDER,
    provider: 'here',
    httpAdapter: 'https',
    apiKey: '_CM3fzxhzyjHhPzQ80KdHfmDpZ6ZHJcXs-Pmjk9eMOo',
    // apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
