const express = require('express')
const app = express()
const port = 3000

// http://localhost:3000/foo.html
app.use(express.static('html'));

// http://localhost:3000/other/foo.html
app.use('/other', express.static('virtual'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// http://localhost:3000/users/foo?action=1
app.get('/users/:userId', function (req, res) {
    res.type('html');
    // req.method req.originalUrl req.protocol req.hostname
    res.write(req.path + '<br>')
    res.write("Language: " + req.get('Accept-Language') + '<br>')
    res.write("I am " + req.params.userId + '<br>')
    res.write("action: " + req.query.action + '<br>')
    //res.send(req.params);
    //res.redirect(url)
    //res.location('/foo/bar')
    //res.json(jsonToSend)
    //res.status(404).send('Sorry, we cannot find that!');
    //res.sendStatus()
    //res.render()
    //res.set('Content-Type', 'text/plain');
    //res.type('json');               // => 'application/json'
    //res.type('application/json');   // => 'application/json'
    //res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
    //res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.end();
});

app.get('/es/', function() {
    var elasticsearch = require('elasticsearch')
    var client = elasticsearch.Client({
      host: 'localhost:9200'
    })
    
    client.search({
      index: 'books',
      type: 'book',
      body: {
        query: {
          multi_match: {
            query: 'express js',
            fields: ['title', 'description']
          }
        }
      }
    }).then(function (response) {
      var hits = response.hits.hits
    }, function (error) {
      console.trace(error.message)
    })
});

app.listen(port, () => {
    console.log(`We're up http://localhost:${port}`)
});