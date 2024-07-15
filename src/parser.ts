import type { BasicDataTypeDef, DataTypeDef, Statement, TableConstraint, TableConstraintUnique } from 'pgsql-ast-parser'
import { astVisitor, parseFirst } from 'pgsql-ast-parser'
import type { Table } from './types'

export function isDataTypeDef(dataType: DataTypeDef): dataType is BasicDataTypeDef {
  return dataType.kind !== 'array'
}

export function isTableConstraintUnique(constraint: TableConstraint): constraint is TableConstraintUnique {
  return constraint.type === 'primary key'
}

export function extractTable(ddl: string) {
  const ast: Statement = parseFirst(ddl)

  const table: Table = {
    name: '',
    columns: [],
    primaryKey: '',
  }
  // columns visitor
  astVisitor(() => ({

    createColumn: (col) => {
      table.columns.push({
        name: col.name.name,
        type: isDataTypeDef(col.dataType) ? col.dataType.name : '',
        config: isDataTypeDef(col.dataType) ? col.dataType.config : undefined,
        notNull: col.constraints?.some(constraint => constraint.type === 'not null') || false,
      })
    },
  })).statement(ast)

  // table name and primary key visitor
  astVisitor(() => ({
    createTable: (t) => {
      table.name = t.name.name
      const pk = t.constraints?.find(constraint => constraint.type === 'primary key')
      const columns = pk ? isTableConstraintUnique(pk) ? pk.columns : [] : []
      if (columns.length !== 1) {
        throw new Error('primary key define is over two columns')
      }
      table.primaryKey = columns[0].name
    },
  })).statement(ast)

  return table
}

export function omitColumns(table: Table, columns: string[]) {
  table.columns = table.columns.filter(col => !columns.includes(col.name))
  return table
}
