module.exports = function(app) {
    var express = require('express');
    var detailFieldRouter = express.Router();

    detailFieldRouter.get('/', function(req, res) {
        res.send({
            data: [
                {
                    "type": "detail-field",
                    "id": "1",
                    "attributes": {
                        "type": "string",
                        "field": "firstName", //fixed typo here
                        "title": "First Name"
                    }
                },
                {
                    "type": "detail-field",
                    "id": "2",
                    "attributes": {
                        "type": "string",
                        "field": "lastName",
                        "title": "Last Name"
                    }
                },
                {
                    "type": "detail-field",
                    "id": "3",
                    "attributes": {
                        "type": "string",
                        "field": "street",
                        "title": "Street"
                    }
                },
                {
                    "type": "detail-field",
                    "id": "4",
                    "attributes": {
                        "type": "string",
                        "field": "city",
                        "title": "City"
                    }
                },
                {
                    "type": "detail-field",
                    "id": "5",
                    "attributes": {
                        "type": "option", //note type of option here
                        "field": "role",
                        "title": "Role"
                    }
                },
                {
                    "type": "detail-field",
                    "id": "6",
                    "attributes": {
                        "type": "boolean",
                        "field": "active",
                        "title": "Is Active?"
                    }
                }
            ]
        });
    });

    detailFieldRouter.post('/', function(req, res) {
        res.status(201).end();
    });

    detailFieldRouter.get('/:id', function(req, res) {
     res.send({
       'detail-field': {
         id: req.params.id
       }
     });
    });

    detailFieldRouter.put('/:id', function(req, res) {
     res.send({
       'detail-field': {
         id: req.params.id
       }
     });
    });

    detailFieldRouter.delete('/:id', function(req, res) {
     res.status(204).end();
    });

    app.use('/api/detail-fields', detailFieldRouter);
};
