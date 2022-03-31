const {Autor} = require('../models/autor.model');

module.exports = {
    create : (request,response) => {
        const {nombre,cita} = request.body;
        Autor.create({nombre,cita})
            .then(autor => response.json(autor))
            .catch(err => response.status(400).json(err));
    },
    getAll : (request,response) => {
        Autor.find().sort({nombre:1})
            .then(autores=> response.json(autores))
            .catch(err=> response.status(400).json(err));
    },
    getId : (request,response) => {
        Autor.findById({_id:request.params.id})
            .then(autor=>response.json(autor))
            .catch(err=>response.status(400).json(err));
    },
    update : (request,response) => {
        Autor.findOneAndUpdate({_id:request.params.id},request.body,{new:true,runValidators: true})
            .then(autor=>response.json(autor))
            .catch(err=>response.status(400).json(err));
    },
    delete : (request,response) => {
        Autor.findOneAndDelete({_id:request.params.id})
            .then(res=>response.json(res))
            .catch(err=>response.json(err));
    }
}