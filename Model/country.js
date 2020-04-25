const fs = require('fs');

class country {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.data = JSON.parse(data);
    }

    getcontryList(){
        if (this.data){
            return this.data;
        }
    }

    getcontrydetal(id){
        return new Promise((resolve,reject)=>{
            for(var object of this.data){
                if(object.id == id){
                    console.log(object);
                    resolve(object);
                    return;
                }
            }
            reject({msg:id+' not found',cod:404});
       });
    }
    
    addcontry(data){
        return new Promise((resolve,reject)=>{
            const add_idx =this.data[this.data.length-1].id;
            console.log(add_idx)
        });
    }
}
module.exports = new country();