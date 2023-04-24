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
        const result = await Sale.find().populate('customer').populate('items.product')
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
}

controller.retriveOne = async(req, res) => {
    try {
        const result = await Sale.findById(req.params.id).populate('customer').populate('items.product');
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
        // Encontra a venda para ser atualizada
    const sale = await Sale.findById(req.params.id)
    
    // items foi passado em req.body
    if(req.body.items) {
      // Percorre cada item de req.body, verificando se já existe
      // ou não em sales.item
      for(let item of req.body.items) {
        // Se o item tem _id, é porque já existe ~> É CASO DE ATUALIZAÇÃO
        if(item._id) {
                    
          // Procura cada propriedade no item de req.body e atualiza no documento
          for(let prop in item) {
            sale.items.id(item._id)[prop] = item[prop]
          }
        }
        // Item não existe ~> É caso de inserção
        else {
          sale.items.push(item)   // Cria um novo item
        }
      }

      // Indica que o items foi modificado e deve ser regravado
      sale.markModified('items')

    }

    // Verifica as demais propriedades do pai (sale) por alterações
    for(let prop in req.body) {
      if(prop !== 'items') {  // Items já foi processado acima
        console.log({prop})
        sale[prop] = req.body[prop]
        sale.markModified(prop)
      }
    }
    
        const result = await sale.save();
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