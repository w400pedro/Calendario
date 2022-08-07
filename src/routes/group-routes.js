const { Router } = require('express');
const routes2 = Router();

const { GroupController } = require('../controllers/group-controller');
const routes = require('./user-routes');

const GroupMasterController = new GroupController();

// routes2.get('/', GroupMasterController.ShowGroups);  

// routes2.get('/:grupo/members', GroupMasterController.ShowGroupMembers);

// routes2.get('/:id/exit', GroupMasterController.ExitGroup);

// routes2.get('/:id/delete', GroupMasterController.DeleteGroup);

// routes2.get('/:grupo/remove/:usuario', GroupMasterController.RemoveGroup);

routes2.get('/time', GroupMasterController.showTime);

// routes2.post('/:group/add', GroupMasterController.AddUser);

// routes2.post('/create', GroupMasterController.RegisterGroup);

// routes2.post("/sendmessage", GroupMasterController.EnviarTexto);

routes2.post('/register', GroupMasterController.RegisterTime);

routes2.post('/registerEmpresa', GroupMasterController.RegisterEmpresa);

routes2.post('/teamMember', GroupMasterController.RegisterMember);


module.exports = routes2;
