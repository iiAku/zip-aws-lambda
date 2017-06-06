'use strict'

declare const module: any
declare const require: any
declare const process: any

import {
  mime,
  promise,
  fs
} from '../utils/node_modules'

export const File: any = (name: string, path: string = '/mnt', bucket: string) => {
 const extension = name.split('.')[(name.split('.')).length - 1]
 return {
  name: name,
  path: path + '/' + name,
  s3Params: () => {
   return {
    put: () => {
     return new promise((resolve: any, reject: any) => {
      fs.stat(path, (err, file_info) => {
       if (err) {
        reject(err)
       } else {
        resolve({
         Bucket: bucket,
         Key: name,
         ContentType: mime.lookup(extension),
         Body: fs.createReadStream(path + '/' + name)
        })
       }
      })
     })
    },
    get: {
     Bucket: bucket,
     Key: name,
    }
   }
  }
 }
}
