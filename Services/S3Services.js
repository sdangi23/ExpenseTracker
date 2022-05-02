const AWS = require('aws-sdk');

const uploadtoS3 = (data, filename) => {
   
    let s3bucket = new AWS.S3({
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY
    });


        var params = {
            Bucket:'expensetracker23',
            Key:filename,
            Body:data,
            ACL:'public-read'
        }

        return new Promise( (resolve, reject) => {

            s3bucket.upload(params, (err, s3response) => {
                if(err){
                    console.log('Something went wrong',err);
                    reject(err);
                }else{
                    resolve(s3response.Location);
                }
            })

        })
        

}

module.exports = {
    uploadtoS3
}