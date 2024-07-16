import * as changeCase from 'change-case'
import { EntityBuilder, EntityDaoImplBuilder, EntityHibernateXmlBuilder, IEntityDaoBuilder, NullEntityBuilder } from './builder'
import { extractTable, omitColumns } from './parser'
import type { CommonPlaceholder, Option, Placeholder, Table } from './types'

const baseCols = [
  'update_author_',
  'update_date_',
  'create_author_',
  'create_date_',
  'update_program_',
  'update_counter_',
]

export class EntityGenerator {
  table: Table
  common: CommonPlaceholder & Placeholder
  output: string

  constructor(createSQL: string, option?: Option) {
    let table = extractTable(createSQL)

    const manyToOneColumns = option?.manyToOne?.map(data => data.name) || []
    const oneToManyColumns = option?.oneToMany?.map(data => data.name) || []
    table = omitColumns(table, [...baseCols, table.primaryKey, ...manyToOneColumns, ...oneToManyColumns])

    table.manyToOne = option?.manyToOne
    table.oneToMany = option?.oneToMany
    this.table = table

    this.output = option?.output || './output'

    this.common = { ...this.initCommonPlaceholder(), ...option?.placeholder }
  }

  initCommonPlaceholder(): CommonPlaceholder {
    const tableName = this.table.name
    const primaryKey = this.table.primaryKey
    return {
      table_name: tableName,
      entity_id_: primaryKey,
      entity: changeCase.camelCase(tableName),
      Entity: changeCase.pascalCase(tableName),
      entityId: changeCase.camelCase(primaryKey),
      ENTITY_ID: changeCase.constantCase(primaryKey),
      EntityId: changeCase.pascalCase(primaryKey),
    }
  }

  async build() {
    await Promise.all([this.buildEntity(), this.buildNullEntity(), this.buildIEntityDao(), this.buildEntityDaoImpl(), this.buildEntityHibernateXML()])
  }

  async buildEntity() {
    await new EntityBuilder(this.table, this.common, this.output).build()
  }

  async buildNullEntity() {
    await new NullEntityBuilder(this.table, this.common, this.output).build()
  }

  async buildIEntityDao() {
    await new IEntityDaoBuilder(this.table, this.common, this.output).build()
  }

  async buildEntityDaoImpl() {
    await new EntityDaoImplBuilder(this.table, this.common, this.output).build()
  }

  async buildEntityHibernateXML() {
    await new EntityHibernateXmlBuilder(this.table, this.common, this.output).build()
  }
}
