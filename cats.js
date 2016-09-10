var _ = require('lodash');

module.exports = function(app){

    _cats = [];

    /* Create */
    app.post('/cats', function(req, res){
        _cats.push(req.body);
        res.statusCode = 201;
        res.json({info: 'cat created'});
    });

    /* Read */
    app.get('/cats', function(req, res){
        res.statusCode = 200;
        res.send(_cats);
    });

    app.get('/cats/:name', function(req, res){
        res.send(
            _.find(_cats, {name: req.params.name})
        );
    });

    /* Update */
    app.put('/cats/:name', function(req, res){
        var index = _.findIndex(_cats, {name: req.params.name});
        
        if(index >= 0){
            _.merge(_cats[index], req.body);
            res.statusCode = 200;
            res.json({info: 'cat updated successfully'});
        }else{
            res.statusCode = 400;
            res.json({info: 'no matching cat found'});
        }
    });

    /* Delete */
    app.delete('/cats/:name', function (req, res){
        _.remove(_cats, function(cat) {  return cat.name == req.params.name;});
        res.statusCode = 200;
        res.json({info: 'cat named ' + req.params.name + ' removed'})
    });

};