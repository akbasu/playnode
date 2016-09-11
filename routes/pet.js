var r = require('request').defaults({
    json: true
});

module.exports = function(app){
    /*Read*/
    app.get('/pets', function(req, res){
        r({uri: 'http://localhost:3001/dogs'}, function(err, response, body){
            if(!err && response.statusCode === 200){
                res.json(body);
            }else{
                res.statusCode = response.statusCode;
                res.json({info: 'error occurred', error: err});
                //res.send(response.statusCode, {info: 'error occurred', error: err});
            }
        });
    });
};