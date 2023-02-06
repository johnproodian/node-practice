// include http module
const http = require('http');

// create server
    // use http.createServer and pass in callback function that runs when an http request comes into the port that is being listened to
const server = http.createServer((req, res) => {
        // callback function
        // send back header and response code (200, presumably, since this is for success?)
        // header needs to be text/html if we want to send back basic 'hello world' html
    res.writeHead(200, {'Content-Type': 'text/html'});
        // end the response
    res.end('hi world')
        // alternatively, could have used res.write() to send the message and then just ended with res.end()--right?
})

// have server listen
server.listen(3001, '127.0.0.1', () => {
    console.log(`we're a-listenin at 3001`)
});