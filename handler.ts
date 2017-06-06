'use strict'

declare const module: any
declare const require: any
declare const process: any

import { aws, dotenv } from './src/utils/node_modules'
dotenv.config({silent: false})
aws.config.update({ apiVersion: '2012-08-10', region: 'us-east-1'})

import { zip } from './src/modules/zip'

module.exports = {
  zip: zip
}
