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

    app.get('/cats/:name', function(req, res){
        var query  = Cat.where({ name: req.params.name });
        query.findOne(function (err, cat) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.json({info: 'error during finding cats', error: err});
            }
            if (cat) {
                res.statusCode = 200;
                res.json({info: 'found successfully', data: cat});
            }
            else{
                res.statusCode = 404;
                res.json({info: 'could not find cat having name: ' + req.params.name});
            }
        });        
    });

    /* Update */
    app.put('/cats/:name', function(req, res){
        var query  = Cat.where({ name: req.params.name });
        query.findOne(function(err, cat){
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.json({info: 'error during finding cats', error: err});
            }
            if(cat){
                _.merge(cat, req.body);
                cat.save(function(err){
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
        var query  = Cat.where({ name: req.params.name });
        query.findOne(function(err, cat){
            if(err){
                res.statusCode = 500;
                res.json({info: 'error trying to find cat to remove', error: err});
            }
            if(cat){
                cat.remove(function (err, cat) {
                    if(err){
                        res.statusCode = 500;
                        res.json({info: 'failed to delete cat', error: err});
                    }
                    else{
                        res.statusCode = 200;
                        res.json({info: 'cat remove successfully'});
                    }                    
                });
            }
            else{
                res.statusCode = 400;
                res.json({info: 'could not find cat to delete'});
            }
        });        
    });
};