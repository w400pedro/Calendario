const { Router } = require('express');
const routes = Router();

const { UserController } = require('../controllers/user-controller');

const UserMasterController = new UserController();

routes.get('/logout', UserMasterController.UserLogout);

routes.post('/login', UserMasterController.UserLogin);

routes.post('/register', UserMasterController.UserRegister);

routes.post('/registraevento', UserMasterController.RegistraEvento);

routes.post('/agendausuario', UserMasterController.VerAgenda);

routes.get('/', UserMasterController.FazerAgendamento);

routes.get('/invites', UserMasterController.ShowInvites);

routes.get('/agenda/:id', UserMasterController.ShowagendaEmpresa);

routes.get('/agendar', UserMasterController.FazerAgendamento);

routes.get('/invitar', UserMasterController.ShowInvitar);

routes.get('/inviteAccept/:id', UserMasterController.inviteAccept);

routes.get('/inviteDeclined/:id', UserMasterController.inviteDecline);

routes.get('/logout', UserMasterController.UserLogout);

module.exports = routes;