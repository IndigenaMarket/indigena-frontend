import { S3 } from "@aws-sdk/client-s3";

const accessKeyId="KLQEKA6YKUUS6VAVZWSV";
const secretAccessKey="GD6B+DaC1l2I/j5lgH7t9FZqpCuBClXcr9Ccjce73Ow";
const s3Client = new S3({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        secretAccessKey: secretAccessKey,
        accessKeyId: accessKeyId,
    }
});

export { s3Client };