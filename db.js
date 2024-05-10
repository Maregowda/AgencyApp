const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://maregowdac7969:Gowda%40123@ac-yabknrl-shard-00-00.nxepjnu.mongodb.net:27017,ac-yabknrl-shard-00-01.nxepjnu.mongodb.net:27017,ac-yabknrl-shard-00-02.nxepjnu.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hxu1t-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

