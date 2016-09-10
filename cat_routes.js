var _ = require('lodash');
var Cat = require('./cat_model.js');

module.exports = function(app){

    _cats = [];

    /* Create */
    app.post('/cats', function(req, res){
        var newCat = new Cat(req.body);
        newCat.save(function(err){
            if(err){
                res.statusCode = 500;
                res.json({info: 'error during cat create', error: err});
            }
        });
        res.statusCode = 201;
        res.json({info: 'cat created'});
    });

    /* Read */
    app.get('/cats', function(req, res){
        Cat.find(function(err, cats){
            if(err){
                res.statusCode = 404;
                res.json({info: 'error during finding cats', error: err});
            }
            res.statusCode = 200;
            res.json({info: 'cats found successfully', data: cats});
        });        
    });

    /*app.get('/cats/:name', function(req, res){
        res.send(
            _.find(_cats, {name: req.params.name})
        );
    });*/

    /* Update */
    /*app.put('/cats/:name', function(req, res){
        var index = _.findIndex(_cats, {name: req.params.name});
        
        if(index >= 0){
            _.merge(_cats[index], req.body);
            res.statusCode = 200;
            res.json({info: 'cat updated successfully'});
        }else{
            res.statusCode = 400;
            res.json({info: 'no matching cat found'});
        }
    });*/

    /* Delete */
    /*app.delete('/cats/:name', function (req, res){
        _.remove(_cats, function(cat) {  return cat.name == req.params.name;});
        res.statusCode = 200;
        res.json({info: 'cat named ' + req.params.name + ' removed'})
    });*/

};