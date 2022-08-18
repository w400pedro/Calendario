const { db } = require("../config/db-connection");

class Group {
    constructor(id, nome, dono) {
        this.id = id;
        this.nome = nome;
        this.dono = dono;
    }
}

class time {
    constructor(id, nome, descricao, dono, empresa) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.dono = dono;
        this.empresa = empresa;
    }
}

class agenda {
    constructor(id, time, descricao, dia){
        this.id = id;
        this.time = time;
        this.descricao = descricao;
        this.dia = dia;
    }
}

class EMPRESA {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

class participantes {
    constructor(id, usuario, time) {
        this.id = id;
        this.usuario = usuario;
        this.time = time;
    }
}

class GroupDAO {
    static async RegisterTime(criatime) {
        const sql = 'INSERT INTO public.time (nome, descricao, dono, empresa) VALUES ($1, $2, $3, $4);';
        const timevalues = [criatime.nome, criatime.descricao, criatime.dono, criatime.empresa]; 
        try {
            await db.query(sql, timevalues);
        } catch (error) {
            console.log('NAO FOI POSSIVEL CADASTRAR O USUÁRIO');
            console.log({ error });
        }
    }

    static async RegisterAgendamento(agendamento) {
        const sql = 'INSERT INTO public.agenda (time, descricao, dia) VALUES ($1, $2, $3);';
        const agendamentovalues = [agendamento.time, agendamento.descricao, agendamento.dia];
        try {
            await db.query(sql, agendamentovalues);
        } catch (error) {
            console.log('NAO FOI POSSIVEL FAZER O AGENDAMENTO');
            console.log({ error });
        }
    }

    static async RegisterMember(user, time) {
        const sql = 'INSERT INTO public.convites (usuario, time) VALUES ($1, $2);';
        const values = [user, time];
        try {
            await db.query(sql, values);
        } catch (error) {
            console.log('NAO FOI POSSIVEL CADASTRAR O USUÁRIO');
            console.log({ error });
        }
    }

    static async RegisterEmpresa(empresa) {
        const sql = 'INSERT INTO public.empresa (nome) VALUES ($1);';
        const empresavalues = [empresa.nome];
        try {
            await db.query(sql, empresavalues);
        } catch (error) {
            console.log('NAO FOI POSSIVEL CADASTRAR O USUÁRIO');
            console.log({ error });
        }
    }

    static async CatchAgenda(usuariologado) {
        const sql = 'SELECT * FROM agenda where usuario = $1';
        const result = await db.query(sql, [usuariologado]);
        const info = result.rows;
        return info;
    }

    static async CatchTime(usuariologado) {
        const sql = 'SELECT time.id as timeid, time.nome as timenome FROM time join participantes on participantes.time = time.id join usuario on usuario.id = participantes.usuario where usuario.id = $1';
        const values = [usuariologado]
        const result = await db.query(sql, values);
        const info = result.rows;
        console.log(info.rows);
        return info;
    }

    }


module.exports = {
    Group,
    time,
    EMPRESA,
    GroupDAO,
    agenda,
    participantes
};