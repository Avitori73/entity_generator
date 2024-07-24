import * as changeCase from 'change-case'
import CONSTANTS from './constants'
import { EntityBuilder, EntityDaoImplBuilder, EntityHibernateXmlBuilder, IEntityDaoBuilder, NullEntityBuilder } from './builder'
import { extractTable, omitColumns } from './parser'
import type { CommonPlaceholder, GeneratorBuilderConfig, GeneratorConfig, Placeholder, Table } from './types'

export class EntityGenerator {
  builderCfg: GeneratorBuilderConfig

  constructor(cfg: GeneratorConfig) {
    let table = extractTable(cfg.createSQL)

    table.manyToOne = cfg.manyToOne || []
    table.oneToMany = cfg.oneToMany || []
    const manyToOneColumns = table.manyToOne.map(v => v.column)
    const oneToManyColumns = table.oneToMany.map(v => v.column)
    table = omitColumns(table, [...CONSTANTS.DEFAULT_COLS, table.primaryKey, ...manyToOneColumns, ...oneToManyColumns])

    const common = { ...this.initCommonPlaceholder(), ...cfg.placeholder }

    this.builderCfg = {
      commonDb: cfg.commonDb || false,
      table,
      common,
      output: cfg.output || './output',
    }
  }

  initCommonPlaceholder(): CommonPlaceholder {
    const tableName = this.builderCfg.table.name
    const primaryKey = this.builderCfg.table.primaryKey
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
    await new EntityBuilder(this.builderCfg).build()
  }

  async buildNullEntity() {
    await new NullEntityBuilder(this.builderCfg).build()
  }

  async buildIEntityDao() {
    await new IEntityDaoBuilder(this.builderCfg).build()
  }

  async buildEntityDaoImpl() {
    await new EntityDaoImplBuilder(this.builderCfg).build()
  }

  async buildEntityHibernateXML() {
    await new EntityHibernateXmlBuilder(this.builderCfg).build()
  }
}
