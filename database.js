const e = require('express');
const { request } = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'ch66a11o22s$',
    database: 'silverlink'
});

connection.connect();

function getConnection() {
    return connection;
}


function getResultBySearch(region1, region2, puInstitution1, serviceKey, online, age, gender, callback) {
    if(region2 == '구/동') region2 = '';
    var region = region1 + ' ' + region2;
    region = region.trim();

    var sql = 'SELECT * FROM silverlinksearch1 WHERE 1=1';
    const params = [];
    if(region != 'all') {
        // sql += ' AND regionS LIKE CONCAT("%", ?, "%")';
        sql += ' AND regionS IN ("all", ?)'; 
        params.push(region);
    }
    if(puInstitution1 != 'all') {
        sql += ' AND puInstitutionS LIKE CONCAT("%", ?, "%")';
        // sql += ' AND puInstitutionS IN ("all", ?)';
        params.push(puInstitution1);
    }
    if(serviceKey != 'all') {
        sql += ' AND serviceKeyS LIKE CONCAT("%", ?, "%")';
        params.push(serviceKey);
    }
    if(online != 'all') {
        sql += ' AND onlineTFS LIKE CONCAT("%", ?, "%")';
        params.push(online);
    }
    if(age != 'all') {
        sql += ' AND ageS = ?';
        // sql += ' AND ageS IN ("0", ?)'; 
        params.push(age);
    }
    if(gender != 'all') {
        sql += ' AND genderS IN ("all", ?)';
        params.push(gender);
    }
    connection.query(sql, params, (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}

function getUserLogin(id, pw, callback) {
    var sql = 'SELECT * FROM user WHERE userID = ? AND userPassword = ?';
    connection.query(sql, [id, pw], (err, result, fields) => {
        if(err) return callback(err);
        else if(result.length == 0) return callback(null, {result: 'fail'});
        else callback(null, result);
    }); 
}

function getSigup(userID, username, userPassword, region, gender, userAge, serviceKey, callback) {
    var sql = 'INSERT INTO user (userID, userPassword, userName, userRegion, userGender, userAge, userKeyword) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [userID, userPassword, username, region, gender, userAge, serviceKey], (err, result, fields) => {
        if(err) return callback(err);
        callback(null, result);
    });
}



    


module.exports = { 
    getResultBySearch,
    getConnection,
    getUserLogin,
    getSigup
}
