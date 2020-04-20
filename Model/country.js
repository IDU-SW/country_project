const fs = require('fs');

class country {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.data = JSON.parse(data)
    }

    getcontryList(){
        if (this.data){
            return this.data;
        }
    }

}
module.exports = new country();