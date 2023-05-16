const Customer = require('../models/Customer');
const qpm = require('query-params-mongo')
const processQuery = qpm()
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

controller.retrieveAll = async(req, res) => {
    try {
        let filter = {}
        if(Object.keys(req.query).length > 0) {
            const query = processQuery(req.query, {}, false)
            filter = query.filter
        }
        
        const result = await Customer.find(filter)
        res.send(result)
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}

controller.retriveOne = async(req, res) => {
    try {
        const result = await Customer.findById(req.params.id);
        if(result){
            res.send(result)
        }else{
            res.status(401).end()
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}

controller.updateOne = async(req, res) => {
    try {
        const result = await Customer.findByIdAndUpdate(req.params.id, req.body);
        if(result){
            res.send(result)
        }else{
            res.status(401).end()
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}
controller.delete = async(req, res) => {
    try {
        const result = await Customer.findByIdAndDelete({_id: req.params.id});
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}
module.exports = controller;