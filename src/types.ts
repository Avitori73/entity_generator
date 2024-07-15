export interface Column {
  name: string
  type: string
  notNull: boolean
  config?: number[]
}

export interface Table {
  name: string
  columns: Column[]
  primaryKey: string
  manyToOne?: ManyToOne[]
  oneToMany?: OneToMany[]
}

export interface Option {
  output?: string
  manyToOne?: ManyToOne[]
  oneToMany?: OneToMany[]
}

export interface ManyToOne {
  name: string
  clz: string
  column: string
}

export interface OneToMany {
  name: string
  clz: string
  column: string
}

export interface CommonPlaceholder {
  table_name: string
  entity: string
  EntityId: string
  entityId: string
  entity_id_: string
  ENTITY_ID: string
}
