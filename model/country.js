const fs = require('fs');
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;

class country {
    constructor() {
        const url = 'mongodb://localhost:27017/example';
        MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client) => {
            if (err) {
                console.error('MongoDB 연결 실패', err);
                return;
            }

            this.db = client.db();
        });
    }

    async getcontryList() {
        const country = this.db.collection('country');
        try {
            let docs = await country.find().toArray();
            return docs;
        }
        catch (error) {
            console.log('getcontryList Error', error);
        }
    }

    async getcontrydetail(id) {
        const country = this.db.collection('country');
        try {
            const docId = new ObjectID(id);
            let docs = await country.findOne({ _id: docId });
            return docs;
        }
        catch (error) {
            console.log('getcontrydetail Error', error);
        }
    }

    async addcontry(data) {
        const country = this.db.collection('country');
        try {
            let result = await country.insertOne(data);
            return await this.getcontrydetail(result.insertedId.toString());
        }
        catch (error) {
            console.log('addcontry Error', error);
        }
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