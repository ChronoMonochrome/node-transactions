# Node transactions

A Node app built with MongoDB and Angular. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

## Installation

1. Clone the repository: `git clone git@github.com:ChronoMonochrome/node-transactions`
2. Install the application: `npm install`
3. Place your own MongoDB URI in `config/database.js`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8080`

## Credits

Frotend: based on https://mkdev.me/posts/zachem-nuzhen-angular-js-i-pochemu-imenno-on ,

Backend: based on https://github.com/scotch-io/node-todo/ .

API used is implemented similarly to API described in article https://metanit.com/web/nodejs/6.5.php .
