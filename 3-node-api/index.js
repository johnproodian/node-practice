// let's create an api without express!

const http = require('http');
// const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const data = fs.readFileSync('./data.json');

let projects = JSON.parse(data);

let lastIndex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

const server = http.createServer((req, res) => {
    const urlObject = new URL(req.url, 'https://localhost:3001/');
    
    if (urlObject.pathname === '/projects' && req.method == 'GET') {
        // GET logic - get all the data from the json file and send it back as a json object
    }

    if (urlObject.pathname === '/projects' && req.method == 'POST') {
        // POST Logic - add a project to the json file
    }

    if (urlObject.pathname === '/projects' && req.method == 'PUT') {
        // PUT logic - change a file from the json file
    }

    if (urlObject.pathname === '/projects' && req.method == 'DELETE') {
        // DELETE logic - delete an item from the json file
    }
})

server.listen(3001, '127.0.0.1');