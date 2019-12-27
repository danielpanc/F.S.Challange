import * as knex from 'knex'
import config from '../config'

let instance = null

export default(function() {
  if(!instance){
    instance = knex(config.db)
  }
  return instance
})