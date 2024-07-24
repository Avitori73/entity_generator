import * as changeCase from 'change-case'

const BASE_LOC = 'jp.co.yamaha_motor.xm03.common'
const BASE_LOC_ENTITY_LOCAL = `${BASE_LOC}.entity`
const BASE_LOC_ENTITY_CMMDB = `${BASE_LOC}.entity.cmmdb`
const BASE_LOC_DAO = `${BASE_LOC}.dao`
const BASE_LOC_DAO_IMPL = `${BASE_LOC_DAO}.impl`

const BASE_PATH_ENTITY_LOCAL = changeCase.pathCase(BASE_LOC_ENTITY_LOCAL)
const BASE_PATH_ENTITY_CMMDB = changeCase.pathCase(BASE_LOC_ENTITY_CMMDB)
const BASE_PATH_DAO = changeCase.pathCase(BASE_LOC_DAO)
const BASE_PATH_DAO_IMPL = changeCase.pathCase(BASE_LOC_DAO_IMPL)

const DEFAULT_COLS = [
  'update_author_',
  'update_date_',
  'create_author_',
  'create_date_',
  'update_program_',
  'update_counter_',
]

export default {
  BASE_LOC,
  BASE_LOC_ENTITY_LOCAL,
  BASE_LOC_ENTITY_CMMDB,
  BASE_LOC_DAO,
  BASE_LOC_DAO_IMPL,
  BASE_PATH_DAO,
  BASE_PATH_DAO_IMPL,
  BASE_PATH_ENTITY_LOCAL,
  BASE_PATH_ENTITY_CMMDB,
  DEFAULT_COLS,
}
