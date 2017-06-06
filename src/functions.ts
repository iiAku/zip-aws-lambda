'use strict'

declare const module: any
declare const require: any
declare const process: any

import { config } from './config'
import * as utils from './utils/utils'
import { File } from './items/File'

import {
 promise,
 aws,
 archiver,
 moment,
 pump,
 async,
 s3s,
 _,
 uuid
} from './utils/node_modules'

export const zipRessource: any = (data: any) => {
 return new promise((resolve: any, reject: any) => {
  const zip: any = (zipContent: any, cbz: any) => {
   let isFinishedCounter: number = 0
   const s3: any = new aws.S3()
   zipContent = (Array.isArray(zipContent)) ? zipContent : [zipContent]
   const fileName: string = _.head(zipContent).name
   const archive: any = archiver('zip', { store: true })
    .on('error', (err: any) => {
     cbz(err)
    })
   const outputFilename: string = (!_.isEmpty(data.event.outputFilename)) ? data.event.outputFilename : uuid.v4()
   const output: any = File(utils.getName(outputFilename, '', config.extensions.zipOutput), config.tempPath, data.event.buckets.output)
   const outputStream: any = s3s(new aws.S3()).upload({
    'Bucket': data.event.buckets.output,
    'Key': output.name,
   }).on('finish', () => {
    if (isFinishedCounter++ === 1) {
     cbz(null, {
      content: zipContent,
      zipped: File(utils.getName(_.head(output.name.split('.')), '', config.extensions.zipOutput), config.tempPath, data.event.buckets.output)
     })
    }
   })

   pump(archive, outputStream, (err: any) => {
    if (err) {
     cbz(err)
    }
   })

   async.each(data.items, (zipItem, cb) => {
    archive.append(s3.getObject(zipItem.s3Params().get).createReadStream(), { name: zipItem.name })
    cb()
   }, () => {
    archive.finalize()
   })
  }
  utils.log('Zip in progress...')
  //map of items of multiple zip ressources (providing multiple zipContents)
  async.map([data.items], zip, (err: any, zips: any) => {
   if (err) {
    reject(err)
   } else {
    utils.log('Zip ended and streamed to', data.event.buckets.output)
    utils.log('Streamed zips output', zips)
    data.zips = zips
    resolve(data)
   }
  })
 })
}

export const parseRessource = (data: any) => {
 return new promise((resolve: any, reject: any) => {
  if (data.hasOwnProperty('event')) {
   if (!_.isEmpty(data.event.buckets.input) && !_.isEmpty(data.event.buckets.output) && !_.isEmpty(data.event.zipContent)) {
    data['items'] = data.event.zipContent.map((zipItem) => {
     let item: any = {
      Bucket: data.event.buckets.input,
      Key: zipItem
     }
     const keyPart: any = item.Key.split('.')
     return File(utils.getName(_.head(keyPart), '', _.last(keyPart)), config.tempPath, item.Bucket)
    })
    utils.log('Ressources parsed, going to zip this', data.items)
    resolve(data)
   } else {
    reject({ err: 'Required parameters not found, expected (buckets.input/buckets.output/zipContent/outputFilename(optional))', provided: data.event })
   }
  } else {
   reject({ err: 'Event is not provided' })
  }
 })
}
