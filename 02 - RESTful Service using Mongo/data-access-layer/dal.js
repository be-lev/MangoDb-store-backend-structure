// const mongodb = require("mongodb");
const mongoose = require("mongoose");

// function connectAsync() {
//   return new Promise((resolve, reject) => {
//     const options = { useNewUrlParser: true, useUnifiedTopology: true };
//     mongodb.MongoClient.connect(
//       config.mongodb.connectionString,
//       options,
//       (err, mongoClient) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(mongoClient.db());
//       }
//     );
//   });
// }

// let database;
// connectAsync()
//   .then((db) => (database = db))
//   .catch((err) => console.log(err));

// function getDatabase() {
//   return database;
// }

// module.exports = {
//   getDatabase,
// };




function connectAsync() {
    return new Promise((resolve, reject) => {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoose.connect(config.mongodb.connectionString, options, (err, db) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

(async () => {
    try {
        await connectAsync();
    }
    catch(err) {
        console.log(err);
    }
})();

