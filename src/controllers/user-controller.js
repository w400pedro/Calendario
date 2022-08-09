const { db } = require('../config/db-connection');
const { Users, UserDAO } = require('../models/user-models');
const { GroupDAO, agenda } = require('../models/group-models');

class UserController {

    async MinhaAgenda(req, res) {
        const existeusuariologado = req.session.user;
        if (existeusuariologado) {
            const usuariologado = req.session.user.id;
            const catchuserlogado = await UserDAO.UserValidationID(usuariologado);
            const agenda = await GroupDAO.CatchAgenda(usuariologado);
            return res.render('minhaagenda', { logado: catchuserlogado[0], agenda: agenda });
        }
        return res.redirect('/login.html')
    }

    async FazerAgendamento(req, res) {
        const existeusuariologado = req.session.user;
        if (existeusuariologado) {
            const usuariologado = req.session.user.id;
            const times = await GroupDAO.CatchTime(usuariologado);
            console.log(times[0]);
            return res.render('agendar', {times: times})
        }
        return res.redirect('/login.html')
    }

    async ShowagendaEmpresa(req, res) {
        empresaselecionada = req.params['empresa'];
        const catchempresa = await UserDAO.UserEmpresa(empresaselecionada);
        return res.render('calendario', { empresa: catchempresa })
    }

    async RegistraEvento(req,res){
        const existeusuariologado = req.session.user;
        if (existeusuariologado) {
            const usuariologado = req.session.user.id;
            const { time, descricao, data } = req.body;
            console.log(time)
            console.log(descricao)
            console.log(data)
            const agendamento = new agenda(null, time, descricao, data, usuariologado);
            await GroupDAO.RegisterAgendamento(agendamento);
            return res.redirect('/')
        }
        return res.redirect('/login.html')
    }

    async inviteAccept(req, res) {
        const time = req.params['id']
        const user = req.session.user.id
        await UserDAO.TeamUserInsert(user, time);
        await UserDAO.TeamUserReject(user, time);
        return res.redirect('/user/invites');
    }

    async inviteDecline(req, res) {
        const time = req.params['id']
        const user = req.session.user.id
        await UserDAO.TeamUserReject(user, time);
        return res.redirect('/user/invites');
    }

    async ShowUser(req, res) {

        const result = await db.query('SELECT * FROM usuario');
        return res.render('zap', { users: result.rows })
    }

    async ShowInvites(req, res) {
        const usuarioconvidado = req.session.user.id
        const convites = await UserDAO.InviteSearch(usuarioconvidado);
        return res.render('invites', { convites: convites })
    }

    async ShowInvitar(req, res) {
        const user = req.session.user.id
        const times = await UserDAO.TeamByUser(user);
        console.log(times)
        return res.render('invitar', { times: times })
    }

    async UserRegister(req, res) {
        const { nome, email, senha } = req.body;

        const usuarioEncontrado = await UserDAO.UserValidation(email);
        if (usuarioEncontrado) return res.send('Email ja existente <a href="/">Voltar</a>');
        const user = new Users(null, nome, email, senha);
        await UserDAO.Register(user);
        return res.redirect('/login.html');
    }

    async UserLogout(req, res) {
        const userLogado = req.session.user;
        if (userLogado) {
            req.session.user = ''
            console.log('Deslogado');
            res.redirect('/')
        } else {
            return res.send("Eii, você ainda não fez login. <br><a href='/'>Voltar</a>")
        }
    }

    async UserLogin(req, res) {

        const { email, senha } = req.body;
        const usuarioEncontrado = await UserDAO.UserValidation(email);

        if (!usuarioEncontrado) return res.send('Usuario não encontrado <a href="/">Voltar</a>');

        if (usuarioEncontrado.senha == senha) {
            req.session.user = usuarioEncontrado;
            console.log('Logado com Sucesso')
            return res.redirect('/');
        } else {
            return res.send('Senha Errada');
        }

    }

}
module.exports = { UserController };