const AWS = require('aws-sdk');
const csv = require('csvtojson');
const S3 = new AWS.S3();
const params = {
  Bucket: 'bucket name',
  Key: 'csv file name',
};
async function csvToJSON() {
  // get csv file and create stream
  const stream = S3.getObject(params).createReadStream();
  // convert csv file (stream) to JSON format data
  const json = await csv().fromStream(stream);
  console.log(json);
}
csvToJSON();
