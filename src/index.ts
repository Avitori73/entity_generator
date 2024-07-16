import fsp from 'node:fs/promises'
import t from 'consola'
import { EntityGenerator } from './EntityGenerator'
import { clearOutput } from './builder'

const opt = {
  placeholder: {
    author: 'zhangjr',
    version: '0.0.1',
  },
}

async function main() {
  const refs = await import('../refs.config.json')
  const createSQL = await fsp.readFile('./create.sql', 'utf-8')
  if (!createSQL) {
    t.error('create.sql not found!')
    return
  }
  clearOutput('./output')

  const createSQLs = createSQL.split(';')
  const generators = []
  for (const sql of createSQLs) {
    if (sql.trim() === '')
      continue
    generators.push(new EntityGenerator(sql, { ...opt, ...refs }).build())
  }
  await Promise.all(generators)
  t.success('All done!')
}

main()
