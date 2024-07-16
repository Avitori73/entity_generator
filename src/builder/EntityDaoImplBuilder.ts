import type { CommonPlaceholder, Placeholder, Table } from '../types'
import { ENTITY_DAO_IMPL_JAVA } from './templates'
import { builderBuild } from './utils'

export class EntityDaoImplBuilder {
  table: Table
  placeholders: Placeholder
  output: string
  template: string
  fileName: string

  constructor(table: Table, common: CommonPlaceholder, output: string) {
    this.table = table
    this.placeholders = { ...common }
    this.output = `${output}/java/jp/co/yamaha_motor/xm03/common/dao/impl`
    this.template = ENTITY_DAO_IMPL_JAVA
    this.fileName = '{Entity}DaoImpl.java'
  }

  async build() {
    await builderBuild(this.fileName, this.template, this.placeholders, this.output)
  }
}
