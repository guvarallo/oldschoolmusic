# Old School Music

An app to search a vast database of audio recordings using Discogs' API.

## Getting Started

1. Clone this repo

2. Inside **src/utils**, create a file named **apiKeys.js** and add your own API key exactly like the example below (you'll need to [create an account here](https://www.discogs.com/users/create)):

    ``
      module.exports = {
      'apiKey': 'your_api_key_here'
    }
    ``
    
    **IMPORTANT**: Only add your key like this for local testing. For production you need to add your key as an environment variable.

3. Run ``npm install``
4. Then ``npm start``

## Built With

* [React](https://reactjs.org/)
* [Ant Design](https://ant.design/)