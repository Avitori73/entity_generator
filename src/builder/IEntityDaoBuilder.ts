import type { CommonPlaceholder, Table } from '../types'
import type { Placeholder } from './../types'
import { I_ENTITY_DAO_JAVA } from './templates'
import { builderBuild } from './utils'

export class IEntityDaoBuilder {
  table: Table
  placeholders: Placeholder
  output: string
  template: string
  fileName: string

  constructor(table: Table, common: CommonPlaceholder, output: string) {
    this.table = table
    this.placeholders = { ...common }
    this.output = output
    this.template = I_ENTITY_DAO_JAVA
    this.fileName = 'I{Entity}Dao.java'
  }

  async build() {
    await builderBuild(this.fileName, this.template, this.placeholders, this.output)
  }
}
