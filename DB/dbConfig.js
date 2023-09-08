const mongoose = require('mongoose');
const dbURL =
  "mongodb+srv://sudharsancode:sudharsan@sdncluster.a0pwnzf.mongodb.net/HMS_Dashboard";
mongoose.connect(dbURL).then(() => console.log('DB Connection Successful')).catch((err) => console.log(err))

module.exports = {mongoose}
