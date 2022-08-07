import { DynamoDBSeeder, Seeds } from '@cloudcomponents/cdk-dynamodb-seeder';
import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
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
  }
}
