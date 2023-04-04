const Sale = require('../models/Sale');

const controller = {}

controller.create = async (req, res) => {
    try {
        //manda as informações que vieram em req.body para serem gravadas no banco de dados
       await Sale.create(req.body);
        
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
        const result = await Sale.find().populate('customer')
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}

controller.retriveOne = async(req, res) => {
    try {
        const result = await Sale.findById(req.params.id).populate('customer');
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
        const result = await Sale.findByIdAndUpdate(req.params.id, req.body);
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
        const result = await Sale.findByIdAndDelete({_id: req.params.id});
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}
module.exports = controller;