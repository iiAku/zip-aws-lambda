import * as utils from '../utils/utils'
import { parseRessource, zipRessource } from '../functions'

export const zip = (event, context, callback) => {
  utils.showContext({ event: event })
  parseRessource({ event: event, zips: [] })
    .then(zipRessource)
    .then(data => console.log(JSON.stringify({ err: 0, result: data }, null, 2)))
    .catch(err => console.log(JSON.stringify({ err: 1, result: err }, null, 2)))
}