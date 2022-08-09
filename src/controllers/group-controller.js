const { db } = require('../config/db-connection');
const { Group, GroupDAO, time, EMPRESA } = require('../models/group-models');
const { UserDAO } = require('../models/user-models');

class GroupController {


    async RegisterTime(req, res) {
        const { empresa ,nome, descricao } = req.body;
        const dono = req.session.user.id
        const criatime = new time(null, nome, descricao, dono, empresa);
        await GroupDAO.RegisterTime(criatime);
        const sql = 'Select id from time where dono = $1 order by id desc limit 1;';
        const timevalues = [dono]; 
        const result = await db.query(sql, timevalues);
        const info = result.rows;
        const timeid = info[0].id
        await GroupDAO.RegisterMember(dono, timeid);
        return res.redirect('/user');
    }

    async RegisterEmpresa(req, res) {
        const { nome } = req.body;
        const empresas = new EMPRESA(null, nome);
        await GroupDAO.RegisterEmpresa(empresas);
        return res.redirect('/user',);
    }

    async RegisterMember(req, res) {
        const { time, email } = req.body;
        const id = await UserDAO.idByEmail(email);
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