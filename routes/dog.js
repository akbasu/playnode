var _ = require('lodash');
var Dog = require('../models/dog.js');

module.exports = function(app){

    /* Create */
    app.post('/dogs', function(req, res){
        var newDog = new Dog(req.body);
        newDog.save(function(err){
            if(err){
                res.statusCode = 500;
                res.json({info: 'error during dog create', error: err});
            }
        });
        res.statusCode = 201;
        res.json({info: 'cat created'});
    });

    /* Read */
    app.get('/dogs', function(req, res){
        Dog.find(function(err, dogs){
            if(err){
                res.statusCode = 404;
                res.json({info: 'error during finding dogs', error: err});
            }
            res.statusCode = 200;
            res.json({info: 'dogs found successfully', data: dogs});
        });        
    });

    app.get('/dogs/:name', function(req, res){
        var query  = Dog.where({ name: req.params.name });
        query.findOne(function (err, dog) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.json({info: 'error during finding dogs', error: err});
            }
            if (dog) {
                res.statusCode = 200;
                res.json({info: 'found successfully', data: dog});
            }
            else{
                res.statusCode = 404;
                res.json({info: 'could not find dog having name: ' + req.params.name});
            }
        });        
    });

    /* Update */
    app.put('/dogs/:name', function(req, res){
        var query  = Dog.where({ name: req.params.name });
        query.findOne(function(err, dog){
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.json({info: 'error during finding cats', error: err});
            }
            if(dog){
                _.merge(dog, req.body);
                dog.save(function(err){
                    if(err){
                        res.statusCode = 500;
                        res.json({info: 'error during cat update', error: err});
                    }else{
                        res.statusCode = 200;
                        res.json({info: 'cat updated successfully'});
                    }
                });                
            }else{
                res.statusCode = 400;
                res.json({info: 'no matching cat found'});
            }
        });
    });

    /* Delete */
    app.delete('/cats/:name', function (req, res){
        var query  = Dog.where({ name: req.params.name });
        query.findOne(function(err, dog){
            if(err){
                res.statusCode = 500;
                res.json({info: 'error trying to find cat to remove', error: err});
            }
            if(dog){
                dog.remove(function (err, dog) {
                    if(err){
                        res.statusCode = 500;
                        res.json({info: 'failed to delete dog', error: err});
                    }
                    else{
                        res.statusCode = 200;
                        res.json({info: 'dog remove successfully'});
                    }                    
                });
            }
            else{
                res.statusCode = 400;
                res.json({info: 'could not find dog to delete'});
            }
        });        
    });
};