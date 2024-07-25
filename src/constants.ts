const BASE_LOC = 'jp.co.yamaha_motor.xm03.common'
const BASE_LOC_ENTITY_LOCAL = `${BASE_LOC}.entity`
const BASE_LOC_ENTITY_CMMDB = `${BASE_LOC}.entity.cmmdb`
const BASE_LOC_DAO = `${BASE_LOC}.dao`
const BASE_LOC_DAO_IMPL = `${BASE_LOC_DAO}.impl`

const BASE_PATH = 'jp/co/yamaha_motor/xm03/common'
const BASE_PATH_ENTITY_LOCAL = `${BASE_PATH}/entity`
const BASE_PATH_ENTITY_CMMDB = `${BASE_PATH}/entity/cmmdb`
const BASE_PATH_DAO = `${BASE_PATH}/dao`
const BASE_PATH_DAO_IMPL = `${BASE_PATH}/dao/impl`

const BASE_PATH_XML_LOCAL = 'jp/co/yamaha_motor/xm03/entity'
const BASE_PATH_XML_CMMDB = `${BASE_PATH_XML_LOCAL}/cmmdb`

const CMMDB_ABSTRACT = 'AbstractHibernateCmmDbDao'
const LOCAL_ABSTRACT = 'AbstractHibernateDao'

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
  BASE_PATH_XML_LOCAL,
  BASE_PATH_XML_CMMDB,
  CMMDB_ABSTRACT,
  LOCAL_ABSTRACT,
  DEFAULT_COLS,
}
