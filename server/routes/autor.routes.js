const express = require('express');
const AutorRouter = express.Router();

const AutorController = require('../controllers/autor.controller');

AutorRouter.get('/all',AutorController.getAll);
AutorRouter.post('/new',AutorController.create);
AutorRouter.get('/:id',AutorController.getId);
AutorRouter.put('/edit/:id',AutorController.update);
AutorRouter.delete('/delete/:id',AutorController.delete);

module.exports = AutorRouter;