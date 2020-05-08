const conn = require('./dbConnection');

exports.prepareTable = () => {
    const sql = 'drop table if exists example.country ; CREATE TABLE example.country ( id INT PRIMARY KEY AUTO_INCREMENT, country VARCHAR(10), capital VARCHAR(10), area VARCHAR(10), language VARCHAR(10), currency VARCHAR(10)););';
    conn.query(sql).then(ret => {
        console.log('Movies 테이블 준비 완료');
        conn.end();
    }).catch(err => {
        console.log('Movies 테이블 준비 실패 :', err);
        conn.end();
    });
} 
