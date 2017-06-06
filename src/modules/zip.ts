'use strict'

declare const module: any
declare const require: any

import * as utils from '../utils/utils'
import { parseRessource, zipRessource} from '../functions'
import {
 async,
 promise,
 moment
} from '../utils/node_modules'

export const zip = (event, context, callback) => {
 utils.showContext({ event: event })
 const data: any = {
  event: event
 }
 parseRessource(data)
  .then(zipRessource)
  .then(data => {
   utils.log({ err: 0, result: data.zips })
  })
  .catch(err => {
   utils.log({ err: 1, result: err })
  })
}
