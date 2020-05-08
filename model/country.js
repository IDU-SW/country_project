const fs = require('fs');
const pool = require('../dbConnection');
const { prepareTable } = require('../prepareTable');

class country {
    // constructor() {
    //     const data = fs.readFileSync('./model/data.json');
    //     this.data = JSON.parse(data);
    // }

    getcontryList = async () => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql = 'SELECT * FROM country;';
            const [rows, metadata] = await conn.query(sql);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }

    getcontrydetail = async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql = 'SELECT * FROM country WHERE id = ?;';
            const [rows, metadata] = await conn.query(sql,id);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }

    addcontry = async (data) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql1 = 'INSERT INTO country SET ?';
            const newcontry = {
                country: data.country,
                capital: data.capital,
                area: data.area,
                language: data.language,
                currency: data.currency
            }
            const ret = await conn.query(sql1, newcontry);
            const sql2 = 'SELECT * FROM country WHERE id = ?;';
            const [rows, metadata] = await conn.query(sql2,ret[0].insertId);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
        
    }

    updatecontry = async (data) => {
        const sql = 'UPDATE country SET ? WHERE id = ?';
        const param = {
            country : data.country,
            capital : data.capital,
            area : data.area,
            language : data.language,
            currency : data.currency,
        }
        const condition = data.id;

        let conn;
        try {
            conn = await pool.getConnection();
            const ret = await conn.query(sql, [param, condition] );
            const info = ret[0];

            console.log('수정 대상 Row(affectedRows) :', info['affectedRows']);
            console.log('수정된 Row(changedRows) :', info['changedRows']); 
            console.log('메세지 :', info['info']); 

            return this.getcontrydetail(condition);
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }
    deltecountry(id) {
        return new Promise((resolve, reject) => {
            for (var object of this.data) {
                if (object.id == id) {
                    const search = this.data.indexOf(object);
                    this.data.splice(search, 1);
                    resolve(object.id);
                    return;
                }
            }
            reject({ msg: id + ' not found', code: 404 });
        });
    }
}
module.exports = new country();