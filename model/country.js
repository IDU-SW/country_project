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

    getcontrydetal = async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const sql = 'SELECT * FROM country WHERE id = ?;';
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

    addcontry(data) {
        return new Promise((resolve, reject) => {
            const add_idx = this.data[this.data.length - 1].id + 1;
            const newcontry = {
                id: add_idx,
                country: data.country,
                capital: data.capital,
                area: data.area,
                language: data.language,
                currency: data.currency
            }
            this.data.push(newcontry);
            resolve(newcontry);
        });
    }

    updatecontry(data) {
        return new Promise((resolve, reject) => {
            for (var object of this.data) {
                if (object.id == data.id) {
                    object.country = data.country;
                    object.capital = data.capital;
                    object.area = data.area;
                    object.language = data.language;
                    object.currency = data.currency;
                    resolve(object);
                    return;
                }
            }
            reject({ msg: id + ' not update', code: 404 });
        });
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