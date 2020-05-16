const fs = require('fs');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('example', 'dev', 'cometrue', {
    dialect: 'mysql',
    host: '127.0.0.1',
});

const Op = Sequelize.Op

class Countries extends Sequelize.Model { }

Countries.init({
    country: Sequelize.STRING(10),
    capital: Sequelize.STRING(10),
    area: Sequelize.STRING(10),
    language: Sequelize.STRING(10),
    currency: Sequelize.STRING(10),
}, { tableName: 'Countries', timestamps: false, sequelize });

class Contry_comment extends Sequelize.Model { }

Contry_comment.init({
    country_id: Sequelize.INTEGER,
    comment: Sequelize.STRING(100),

}, { tableName: 'Contry_comment', timestamps: false, sequelize });

class country {
    constructor() {
        try {
            console.log("!!!!!!!!!!!!!");
            this.prepareModel(); 
        } catch (error) {
            console.error(error);    
        }
    }

    async prepareModel() {
        try {
            await Countries.sync({force:true});
            await Contry_comment.sync({force:true});
            Countries.hasMany(Contry_comment, {foreignKey:'country_id'});
            // sequelize.close();
        }
        catch (error) {
            console.log('country.sync Error ', error);
        }
    }

    async getcontryList() {
        let returnval;
        await Countries.findAll({})
            .then(results => {
                for (var item of results) {
                    console.log('id:', item.id);
                }
                returnval = results;
            })
            .catch(error => {
                console.error('Error :', error);
            });
            return returnval;
    }

    async getcontrydetal(id) {
        try {
            let result = await Countries.findOne({ where: { id: { [Op.eq]: id } } });
            if (result) {
                return result.dataValues;
            }
            else {
                console.log('no data');
            }
        } catch (error) {
            console.log('Error :', error);
        }
    }

    async addcontry(data) {
        let returnval;
        const country_data = [data];
        try {
            const creates = await country_data.map(item => Countries.create(item, { logging: false }));
            await Promise.all(creates)
            .then(ret => {
                const newAddIds = ret.map(result => result.dataValues);
                returnval = newAddIds;
                }).catch(err => {
                    console.error('Create Failure :', err);
                });
        } catch (error) {
            console.log('Error :', error);
        }
        return returnval;
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