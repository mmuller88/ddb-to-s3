# ddb-to-s3

## deploy & destroy

```bash
yarn deploy --require-approval never
yes | yarn cdk destroy
```

## Task

what we'll do: Given a DynamoDB Table (which we'll just create in this case), we would like to export the full table content on a regular basis to S3. We're aiming for a solution which has low maintenance and makes sure we don't break it accidentally.

Out of scope for this exercise, for informational purposes only: The data which is exported will be imported into Google Big Query somehow.

The tooling/workflow how this is implemented is up to you. While we're pairing, the solution will be driven by you. Since we're using your machine, it would be great if you could bring your own AWS Account for this. If you don't have an account you could use for that, please let me know so I can prepare an environment for you.

### Proposal 1 - request S3 export

Only works when [point-in-time-recovery](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/PointInTimeRecovery.html) is activated. Then an export to S3 as JSON can be requested <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataExport.Requesting.html>. The export request can be triggered via scheduled lambda.

#### Pro

Super less complexity as the export is managed from DDB

#### Con

Needs point-in-time-recovery activation which increases costs

#### Misc

* scheduled lambda: <https://edwinradtke.com/eventtargets>

### Proposal 2 - Glue ETL job

Creating a scheduled glue job to export the table to S3

#### Pro

Control over export logic. Could be used to store in parquet format.

#### Con

Need to write Glue ETL job code + failure and retry handling code.

#### Misc

* glue ETL job: <https://gist.github.com/Visya/adc0a55335490e3b8c95432f65139267>
