var mysql = require('mysql2');

var pool = mysql.createPool({
    "user": 'root',
    "password": 'desafio123',
    "database": 'desafio',
    "host": 'localhost',
    "port": 3306
})

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}

exports.pool = pool;