const client = "mongodb://localhost:27017/";
const dbName = "Demo";
collectionName = "Test";
bucketSize = 2;

const submission = async (client, dbName, collectionName, bucketSize) => {

  let promise = new Promise((resolve, reject) => {
    const connection = await MongoClient.connect(client, { useNewUrlParser: true });
    const db = connection.db(dbName);
  })
  let promise1 = new Promise((resolve, reject) => {
    db.collection(collectionName, function (err, collection) {
      collection
        .find()
        .toArray(function (err, data) {
          let cary = {};
          data.map(curData => {
            cary[curData.category] = [...(cary[curData.category] || []),
            curData._id];
          });
        })
    })
  })
  let promise2 = new Promise((resolve, reject) => {
    Object.keys(cary).map(ans => {
      let tempAns = {
        category: ans,
        id: cary[ans]
      };
      console.log(tempAns.category);
      console.log(_lodash.chunk(tempAns.id, bucketSize));
    });
  });
}
submission();
connection.close();