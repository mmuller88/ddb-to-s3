import * as AWS from 'aws-sdk';
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const { DYNAMODB_TABLE_ARN, S3_BUCKET_NAME } = process.env;

const ddb = new AWS.DynamoDB();

export async function handler(event: any) {
  console.debug(`event: ${JSON.stringify(event)}`);
  if (DYNAMODB_TABLE_ARN === undefined) {
    throw new Error('DynamoDB_TABLE_ARN is not defined');
  }

  if (S3_BUCKET_NAME === undefined) {
    throw new Error('S3_BUCKET_NAME is not defined');
  }

  const params: AWS.DynamoDB.Types.ExportTableToPointInTimeInput = {
    TableArn: DYNAMODB_TABLE_ARN,
    S3Bucket: S3_BUCKET_NAME,
  };

  await ddb.exportTableToPointInTime(params).promise();
}
