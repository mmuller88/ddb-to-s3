import { DynamoDBSeeder, Seeds } from '@cloudcomponents/cdk-dynamodb-seeder';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class DynamoDBSeederStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const table = new Table(this, 'Table', {
      partitionKey: {
        name: 'id',
        type: AttributeType.NUMBER,
      },
      removalPolicy: RemovalPolicy.DESTROY,
      pointInTimeRecovery: true,
    });

    new DynamoDBSeeder(this, 'InlineSeeder', {
      table,
      seeds: Seeds.fromInline([
        {
          id: 3,
          column: 'foo',
        },
        {
          id: 4,
          column: 'bar',
        },
        {
          id: 5,
          otherColumn: 'foobar',
        },
      ]),
    });

    const bucket = new s3.Bucket(this, 'DdbToS3Bucket');

    const exportS3Lambda = new NodejsFunction(this, 'exportS3', {
      runtime: lambda.Runtime.NODEJS_16_X,
      environment: {
        DYNAMODB_TABLE_ARN: table.tableArn,
        S3_BUCKET_NAME: bucket.bucketName,
      },
    });

    exportS3Lambda.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [table.tableArn],
        actions: ['dynamodb:ExportTableToPointInTime'],
      }),
    );
  }
}
