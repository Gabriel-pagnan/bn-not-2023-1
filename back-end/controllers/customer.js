const Customer = require('../models/Customer');

const controller = {}

controller.create = async (req, res) => {
    try {
        //manda as informações que vieram em req.body para serem gravadas no banco de dados
       await Customer.create(req.body);
        
        //HTTP 201: created
        res.status(201).end()
    } catch (error) {
        console.log(error);
        //HTTP 500: Internal server error
        res.status(500).send(error)
    }
}
module.exports = controller;