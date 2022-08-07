const { Client } = require('pg');

const db = new Client({
    connectionString: 'postgres://xdcpqvqrpoceit:21bec8e417cc888393d1af50377b950cbef96c2b489687b1d3f9b7e7527486f1@ec2-54-161-255-125.compute-1.amazonaws.com:5432/deceugcdd4bvr1',
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect(err => {
    if (err) {
        console.log("Não foi possivel se conectar ao banco.");
        console.log( { err });
    } else {
        console.log("Banco conectado com sucesso.");
    }
});

module.exports = { db }