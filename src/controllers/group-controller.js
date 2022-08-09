const { db } = require('../config/db-connection');
const { Group, GroupDAO, time, EMPRESA } = require('../models/group-models');
const { UserDAO } = require('../models/user-models');

class GroupController {


    async RegisterTime(req, res) {
        const { empresa ,nome, descricao } = req.body;
        const dono = req.session.user.id
        const criatime = new time(null, nome, descricao, dono, empresa);
        await GroupDAO.RegisterTime(criatime);
        return res.redirect('/login.html');
    }

    async RegisterEmpresa(req, res) {
        const { nome } = req.body;

        const empresas = new EMPRESA(null, nome);
        await GroupDAO.RegisterEmpresa(empresas);
        return res.redirect('/login.html',);
    }

    async RegisterMember(req, res) {
        const { time, email } = req.body;
        const id = await UserDAO.idByEmail(email);
        console.log(id)
        await GroupDAO.RegisterMember(id, time);
        return res.redirect('/user/invitar',);
    }

    async showTime(req, res) {
        const usuariologado = req.session.user;
         if (usuariologado) {
        const consulta = await db.query('SELECT * from empresa');
        const times = consulta.rows
        return res.render('register-time', {times: times})
        } 
        return res.redirect('/login.html')
    }

}
module.exports = { GroupController };