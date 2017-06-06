'use strict'

declare const module: any
declare const require: any
declare const process: any

import {
 moment,
 _
} from './node_modules'

export const log = (str_a, str_b?) => {
 if (str_b) {
  console.log('[' + moment().format() + '] ' + str_a, (_.isString(str_b)) ? str_b : JSON.stringify(str_b, null, 2))
 } else {
  console.log('[' + moment().format() + '] ', (_.isString(str_a)) ? str_a : JSON.stringify(str_a, null, 2))
 }
}

export const getName: any = (data: any, type: string, extension: string, position: any = '') => {
 type = (!_.isEmpty(type)) ? '-' + type + '-' : ''
 position = (_.isInteger(position)) ? position : ''
 extension = (extension) ? extension : ''
 return (data + type + position + '.' + extension).replace('-.', '.')
}

export const showContext = (data: any) => {
 console.log('-------- EVENT --------')
 console.log(JSON.stringify(data.event, null, 3))
 console.log('--------  ENV  --------')
 console.log('SERVERLESS_STAGE', process.env.SERVERLESS_STAGE)
 console.log('SERVERLESS_PROJECT', process.env.SERVERLESS_PROJECT)
 console.log('SERVERLESS_SERVICE_NAME', process.env.SERVERLESS_SERVICE_NAME)
 console.log(process.env)
}
