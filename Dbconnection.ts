import mysql from 'mysql';

const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Common@123',
    database:'helloworld'
});

export default connection;
