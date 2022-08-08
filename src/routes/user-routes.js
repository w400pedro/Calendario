const { Router } = require('express');
const routes = Router();

const { UserController } = require('../controllers/user-controller');

const UserMasterController = new UserController();

//routes.get('/logout', UserMasterController.UserLogout);

//routes.get('/', UserMasterController.ShowGroupsMain);

//routes.get('/:id', UserMasterController.ShowGroupsMain);

routes.post('/login', UserMasterController.UserLogin);

routes.post('/register', UserMasterController.UserRegister);

routes.get('/invites', UserMasterController.ShowInvites);

routes.get('/agenda', UserMasterController.Showagenda);

routes.get('/invitar', UserMasterController.ShowInvitar);

routes.get('/inviteAccept/:id', UserMasterController.inviteAccept);

routes.get('/inviteDeclined/:id', UserMasterController.inviteDecline);

module.exports = routes;