
const moongose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()

const connect=() =>{
    return  moongose.connect(
        "mongodb://AK:AK123@ac-cy6shgc-shard-00-00.2nfnusd.mongodb.net:27017,ac-cy6shgc-shard-00-01.2nfnusd.mongodb.net:27017,ac-cy6shgc-shard-00-02.2nfnusd.mongodb.net:27017/Heliverse?ssl=true&replicaSet=atlas-l9i7a3-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
}


module.exports = connect;