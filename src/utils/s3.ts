'use strict'

declare const module: any
declare const require: any
declare const process: any

import {
  aws,
  fs,
  pump
} from './node_modules'

export const get: any = (file: any, callback: any) => {
 const s3: any = new aws.S3()
 const writeStream = fs.createWriteStream(file.path)
 const readStream = s3.getObject(file.s3Params().get).createReadStream()
 pump(readStream, writeStream, (err: any) => {
  if (err) {
   callback(err)
  } else {
   callback()
  }
 })
}
