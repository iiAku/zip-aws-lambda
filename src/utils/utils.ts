import * as _ from 'lodash'
import * as moment from 'moment'

export const log = (str_a, str_b ? ) => {
  if (str_b) {
    console.log('[' + moment().format() + '] ' + str_a, (_.isString(str_b)) ? str_b : "\n" + JSON.stringify(str_b, null, 2))
  } else {
    console.log('[' + moment().format() + '] ', (_.isString(str_a)) ? str_a : "\n" + JSON.stringify(str_a, null, 2))
  }
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