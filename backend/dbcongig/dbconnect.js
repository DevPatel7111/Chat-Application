// const mogoose =  require('mongoose');
// const dbconnect = async ()=>{
// try{
//     await mogoose.connect(process.env.MONGO_DB_URL);
//     console.log("connectionsis establised ")

// }
// catch(error){
//     console.log("error ")

// }
// }
// module.exports = dbconnect;

const mongoose = require('mongoose');

require('dotenv').config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbconnect;
