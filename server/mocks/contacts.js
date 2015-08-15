module.exports = function(app) {
    var express = require('express');
    var contactsRouter = express.Router();

    var contacts = [
        {
            "type": "contact",
            "id": "1",
            "attributes": {
                "first-name": "Joe",
                "last-name": "Black",
                "street": "High St.",
                "city": "Oxford",
                "role": "Receptionist",
                "active": true
            }
        },
        {
            "type": "contact",
            "id": "2",
            "attributes": {
                "first-name": "Amy",
                "last-name": "White",
                "street": "High St.",
                "city": "Oxford",
                "role": "Manager",
                "active": false
            }
        },
        {
            "type": "contact",
            "id": "3",
            "attributes": {
                "first-name": "Mark",
                "last-name": "Green",
                "street": "Turl St.",
                "city": "Oxford",
                "role": "Owner",
                "active": true
            }
        }
    ];

    contactsRouter.get('/', function(req, res) {
        res.send({
            data: contacts
        });
    });

    contactsRouter.post('/', function(req, res) {
        res.status(201).end();
    });

    contactsRouter.get('/:id', function(req, res) {
        var contact;
        for (record of contacts) {
            if (record.id === req.params.id) {
                contact = record;
                break;
            }
        }
        res.send({
            data: contact
        });
    });

    contactsRouter.put('/:id', function(req, res) {
        res.send({
            'contacts': {
                id: req.params.id
            }
        });
    });

    contactsRouter.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    app.use('/api/contacts', contactsRouter);
};
