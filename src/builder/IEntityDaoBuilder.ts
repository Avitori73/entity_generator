import type { CommonPlaceholder, Table } from '../types'

export class IEntityDaoBuilder {
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
