import { awscdk } from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.35.0',
  defaultReleaseBranch: 'main',
  name: 'ddb-to-s3',
  projenrcTs: true,

  deps: ['@cloudcomponents/cdk-dynamodb-seeder@^2.1.0'],
  devDeps: ['aws-sdk'],

  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
    },
  },
});

project.setScript('cdk', 'cdk');

project.synth();
