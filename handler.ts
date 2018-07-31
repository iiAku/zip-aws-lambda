import * as aws from 'aws-sdk'
aws.config.update({ apiVersion: '2012-08-10', region: 'us-east-1' })

import { zip } from './src/modules/zip'

module.exports = { zip: zip }