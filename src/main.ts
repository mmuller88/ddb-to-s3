import { App } from 'aws-cdk-lib';
import { DynamoDBSeederStack } from './dynamodb-seeder-stack';

// for development, use account/region from cdk cli
const devEnv = {
  account: '981237193288',
  region: 'eu-central-1',
};

const app = new App();

new DynamoDBSeederStack(app, 'ddb-to-s3-dev', { env: devEnv });

app.synth();
