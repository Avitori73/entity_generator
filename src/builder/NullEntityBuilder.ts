import type { CommonPlaceholder, Placeholder, Table } from '../types'
import { NULL_ENTITY_JAVA } from './templates'
import { builderBuild } from './utils'

export class NullEntityBuilder {
  table: Table
  placeholders: Placeholder
  output: string
  template: string
  fileName: string

  constructor(table: Table, common: CommonPlaceholder, output: string) {
    this.table = table
    this.placeholders = { ...common }
    this.output = output
    this.template = NULL_ENTITY_JAVA
    this.fileName = 'Null{Entity}.java'
  }

  async build() {
    await builderBuild(this.fileName, this.template, this.placeholders, this.output)
  }
}
