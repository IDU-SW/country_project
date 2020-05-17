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
            this.prepareModel();
        } catch (error) {
            console.error(error);
        }
    }

    async prepareModel() {
        try {
            await Countries.sync({ force: true });
            await Contry_comment.sync({ force: true });
            Countries.hasMany(Contry_comment, { foreignKey: 'country_id' });
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
                returnval = results;
            })
            .catch(error => {
                console.error('Error :', error);
            });
        return returnval;
    }

    async getcontrydetail(id) {
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

    async getcontry_comment(id) {
        try {
            let result = await Contry_comment.findAll({ where: { country_id: { [Op.eq]: id } } });
            if (result) {
                return result;
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
    async addcomment(data) {
        try {
            const ret = await Contry_comment.create({
                country_id: data.id,
                comment: data.country
            }, { logging: false });
            const newData = ret.dataValues;
            console.log(newData);
            console.log('Create success');
        }
        catch (error) {
            console.log('Error : ', error);
        }
    }
    addcountry

    async updatecontry(data) {
        try {
            let result = await Countries.update(
                {
                    country: data.country,
                    capital: data.capital,
                    area: data.area,
                    title: data.title,
                    language: data.language,
                    currency: data.currency,
                },
                { where: { id: { [Op.eq]: data.id } } }
            );
            return result;
        }
        catch (error) {
            console.log('Error :', error);
        }
    }
    async deltecountry(id) {
        try {
            let result = await Countries.destroy({ where: { id: { [Op.eq]: id } } });
            console.log('Remove success :', result);
        }
        catch (error) {
            console.log('Remove Error :', error);
        }
    }
    async deltecountry_comment(id) {
        try {
            let result = await Contry_comment.destroy({ where: { country_id: { [Op.eq]: id } } });
            console.log('Remove success :', result);
        }
        catch (error) {
            console.log('Remove Error :', error);
        }
    }
}
module.exports = new country();