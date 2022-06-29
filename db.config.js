module.exports = {
  url: "mongodb+srv://"+ process.env.MONGO_DB_USER +":"+ process.env.MONGO_DB_PASSWORD +"@"+ process.env.MONGO_DB_NAME +".mongodb.net/?retryWrites=true&w=majority"
};