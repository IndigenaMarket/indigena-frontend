import { S3 } from "@aws-sdk/client-s3";

const accessKeyId=process.env.REACT_APP_s3_ACCESSKEY;
const secretAccessKey=process.env.REACT_APP_s3_SECRET_ACCESSKEY ;
const s3Client = new S3({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        secretAccessKey: secretAccessKey,
        accessKeyId: accessKeyId,
    }
});

export { s3Client };