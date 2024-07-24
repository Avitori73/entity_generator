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
  manyToOne?: {
    [name: string]: ManyToOne[]
  }
  oneToMany?: {
    [name: string]: OneToMany[]
  }
  placeholder: Placeholder
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
  Entity: string
  EntityId: string
  entityId: string
  entity_id_: string
  ENTITY_ID: string
}

export interface EntityPlaceholder {
  // imports
  manyToOneImports: string
  // static
  ENTITY_COLUMNS_STATIC: string
  MANY_TO_ONE_STATIC: string
  ONE_TO_MANY_STATIC: string
  // fields
  entityColumnsFields: string
  manyToOneFields: string
  oneToManyFields: string
  // constructor args
  entityColumnsConstructorArg: string
  manyToOneConstructorArg: string
  oneToManyConstructorArg: string
  // constructor sets
  entityColumnsConstructorSet: string
  manyToOneConstructorSet: string
  oneToManyConstructorSet: string
  // builder
  builderEntityColumnsFields: string
  builderManyToOneFields: string
  builderOneToManyFields: string
  // builder constructor
  builderManyToOneDaoArg: string
  builderManyToOneDaoSet: string
  // builder setters
  builderManyToOneSetters: string
  builderEntityColumnsSetters: string
  builderOneToManySetters: string
  // builder build
  builderEntityColumnsBuilds: string
  builderManyToOneBuilds: string
  builderOneToManyBuilds: string
  // setters & getters
  entityColumnsSettersAndGetters: string
  manyToOneSettersAndGetters: string
  oneToManySettersAndGetters: string
  // copy fields
  entityColumnsCopyFields: string
  manyToOneCopyFields: string
  oneToManyCopyFields: string
}

export interface HibernatePlaceholder {
  ColumnsXML: string
  ManyToOneXML: string
  OneToManyXML: string
}

export interface Placeholder {
  [key: string]: string
}

export interface GeneratorConfig {
  commonDb?: boolean
  createSQL: string
  oneToMany?: ManyToOne[]
  manyToOne?: OneToMany[]
  output?: string
  placeholder?: Placeholder
}

export interface GeneratorBuilderConfig {
  commonDb: boolean
  table: Table
  common: CommonPlaceholder & Placeholder
  output: string
}

export interface Builder {
  commonDb?: boolean
  table: Table
  placeholders: Placeholder
  output: string
  template: string
  fileName: string
}
