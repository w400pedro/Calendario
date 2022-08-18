const { Router } = require('express');
const routes2 = Router();

const { GroupController } = require('../controllers/group-controller');
const routes = require('./user-routes');

const GroupMasterController = new GroupController();

routes2.get('/visualizar/:id', GroupMasterController.showTimeAgenda);

routes2.get('/time', GroupMasterController.showTime);

routes2.get('/visualizar', GroupMasterController.ChooseAgenda);

routes2.post('/register', GroupMasterController.RegisterTime);

routes2.post('/registerEmpresa', GroupMasterController.RegisterEmpresa);

routes2.post('/teamMember', GroupMasterController.RegisterMember);


module.exports = routes2;
