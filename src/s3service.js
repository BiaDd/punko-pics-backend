// const dotenv = require('dotenv').config;
// const s3 = require('aws-sdk/clients/s3');

// // AWS configurations
// const bucketName = process.env.AWS_BUCKET_NAME || dotenv.parsed.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION || dotenv.parsed.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID_PUNKOPICS || dotenv.parsed.AWS_ACCESS_KEY_ID_PUNKOPICS;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_PUNKOPICS || dotenv.parsed.AWS_SECRET_ACCESS_KEY_PUNKOPICS;

// const s3Bucket = new s3({
//     region,
//     accessKeyId,
//     secretAccessKey
// });

// // Get all the keys from bucket
// function getAllKeys() {
//     const uploadParams = {
//         Bucket: bucketName
//     };

//     return s3Bucket.listObjectsV2(uploadParams).promise();
// }

// function getPictureSignedUrl(filename) {
//     const params = {
//         Bucket: bucketName,
//         Key: filename
//     };

//     // Generate a pre-signed URL for the object
//     const imageUrl = s3Bucket.getSignedUrl('getObject', params);
//     return imageUrl;
// }

// exports.listAllFiles = getAllKeys;
// exports.getPictureSignedUrl = getPictureSignedUrl;