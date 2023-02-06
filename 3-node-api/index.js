// let's create an api without express!

const http = require('http');
// const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const { url } = require('inspector');

const data = fs.readFileSync('./data.json', {encoding: 'utf8'});

let projects = JSON.parse(data);

let lastIndex = projects.length === 0 ? 0 : projects[projects.length - 1].id;

const server = http.createServer((req, res) => {
    const urlObject = new URL(req.url, 'https://localhost:3001/');
    console.log(urlObject.pathname);
    
    if (urlObject.pathname === '/projects' && req.method == 'GET') {
        // GET logic - get all the data from the json file and send it back as a json object
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(projects, null, 2));
    }

    if (urlObject.pathname === '/projects' && req.method == 'POST') {
        // POST Logic - add a project to the json file
        req.on('data', data => {
            // console.log('data: ', data);
            const jsonData = JSON.parse(data);
            console.log('jdat: ', jsonData);
            const title = jsonData.title;

            if (title) {
                projects.push({id: ++lastIndex, title, task: [] });

                fs.writeFile('./data.json', JSON.stringify(projects, null, 2), (err) => {
                    if (err) {
                        const message = { message: 'could not persist data!' }
                        res.writeHead(500, {'Content-Type' : 'application/json'});
                        res.end(JSON.stringify(message, null, 2));
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(projects, null, 2))
                    }
                })
            }
        })
    }

    if (urlObject.pathname === '/projects/tasks' && req.method == 'POST') {
        req.on('data', data => {
            const search = urlObject.search;
            const id = Number(search.split("=")[1]);

            if (search) {
                if (id) {
                    const jsonData = JSON.parse(data);
                    const task = jsonData.task;
    
                    if (!task) {
                        const message = { message: 'no task found in body request!' }
    
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(message))
                    } else {
                        projects.forEach((project, index) => {
                            if (project.id == id) {
                                projects[index].tasks.push(task);
                            }
                        });
    
                        fs.writeFile('./data.json', JSON.stringify(projects, null, 2), (err) => {
                            if (err) {
                                const message = { message: 'could not persist data' };
                                res.writeHead(500, {'Content-Type': 'application/json' });
                                res.end(JSON.stringify(message));
                            } else {
                                res.writeHead(200, {'Content-Type': 'application/json' });
                                res.end(JSON.stringify(projects, null, 2));
                            }
                        })
                    }
                } else {
                    const message = { message: 'no id parameter' };
    
                    res.writeHead(400, {'Content-Type': 'application/json' });
                    res.end(JSON.stringify(message, null, 2));
                }
            } else {
                const message = { message: 'no query parameter' };

                res.writeHead(400, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(message));
            }
        })
    }

    if (urlObject.pathname === '/projects' && req.method == 'PUT') {
        // PUT logic - change a file from the json file
    }

    if (urlObject.pathname === '/projects' && req.method == 'DELETE') {
        // DELETE logic - delete an item from the json file
    }
})

server.listen(3001, '127.0.0.1');