const { db } = require("../config/db-connection");

class Users {
    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

class UserDAO {

    static async TeamByUser(user) {
        const sql = "Select * from time where dono = $1"
        const values = [user];
        const result = await db.query(sql, values);
        const times = result.rows;
        return times;
    }

    static async idByEmail(email) {
        const sql = "Select id from usuario where email = $1"
        const values = [email];
        const result = await db.query(sql, values);
        const id = result.rows[0].id;
        return id;
    }

    static async TeamUserInsert(user, time) {
        const sql = "INSERT INTO public.participantes (usuario, time) VALUES ($1, $2)"
        const values = [user, time];
        await db.query(sql, values);
    }

    static async TeamUserReject(user, time) {
        const sql = "DELETE from convites where usuario = $1 and time = $2"
        const values = [user, time];
        await db.query(sql, values);
    }

    static async InviteSearch(user) {
        const sql = "SELECT * from convites join time on time.id = convites.time where usuario = $1"
        const result = await db.query(sql, [user]);
        const usuario = result.rows;
        return usuario;
    }

    static async UserValidation(email) {
        const sql = 'SELECT * FROM usuario where email = $1';
        const result = await db.query(sql, [email]);
        const usuario = result.rows[0];
        return usuario;
    }


    static async UserValidationID(usuario) {
        const sql = 'SELECT * FROM usuario where id = $1';
        const result = await db.query(sql, [usuario]);
        const userinfo = result.rows;
        return userinfo;
    }

    static async Register(user) {
        const sql = 'INSERT INTO public.usuario (nome, email, senha) VALUES ($1, $2, $3);';
        const uservalues = [user.nome, user.email, user.senha];
        try {
            await db.query(sql, uservalues);
        } catch (error) {
            console.log('NAO FOI POSSIVEL CADASTRAR O USUÁRIO');
            console.log({ error });
        }
    }

        static async CatchRole(rolev){
        const roleoficial = [rolev[0], rolev[1]];
        const sql = 'SELECT tipo FROM grupousuario where usuario = $1 and grupo = $2';
        const result = await db.query(sql, roleoficial);
        const role = result.rows[0];
        return role;
     } 
}

module.exports = {
    Users,
    UserDAO
};