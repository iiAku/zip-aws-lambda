# zip-aws-lambda
AWS Lambda to zip ressources as stream between S3 buckets

Install Typescript
`yarn add global typescript`
or
`npm install global typescript`
```
yarn install or npm install
tsc *.ts
```
Run lambda locally

`serverless invoke local -f zip -p event/test.json`

Deploy lambda

`serverless deploy -s STAGE_NAME`
