// built-in node module used to create a server that listens to ports and sends responses back to clients
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// createServer() creates a server--i.e., creates the functionality of listening for requests and producing a response to certain requests and sending the response back to the client
    // execute the callback function when a req comes to the computer at the given port (inside the listen() later)
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// start listening and indicate WHERE to listen with port and host
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});