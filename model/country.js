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

    async updatecontry(data) {
        let country = this.db.collection('country');
        try {
            const docId = new ObjectID(data.id);
            let returval = "";
            await country.updateOne(
                { _id: docId },
                {
                    $set: {
                        country: data.country,
                        capital: data.capital,
                        area: data.area,
                        language: data.language,
                        currency: data.currency
                    }
                })
                .then(
                    result => {
                        returval = "OK";
                    })
                .catch(err => {
                    console.log('updatecontry Error', err);
                });
            if (returval == "OK") {
                return data;
            }
        } catch (error) {
            console.log('Error :', error);
        }
    }
    deltecountry(id) {
        try {
            let country = this.db.collection('country');
            const docId = new ObjectID(id);
            country.deleteOne({ _id: docId })
                .then(result => {
                    console.log('deleteMany 성공. 결과 : ', result.result);
                })
                .catch(err => {
                    console.log('Delete Many Fail : ', err);
                });
        } catch (error) {
            console.log('Error :', error);
        }
    }
}
module.exports = new country();