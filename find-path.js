require('http').createServer((req, res) => {
    res.end('Your absolute path is: ' + __dirname);
}).listen(3001, () => console.log('Listening on 3001'));
