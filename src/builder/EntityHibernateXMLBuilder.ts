import type { CommonPlaceholder, Table } from '../types'

export class EntityHibernateXmlBuilder {
  table: Table
  common: CommonPlaceholder
  output: string

  constructor(table: Table, common: CommonPlaceholder, output: string) {
    this.table = table
    this.common = common
    this.output = output
  }

  build() {

  }
}
