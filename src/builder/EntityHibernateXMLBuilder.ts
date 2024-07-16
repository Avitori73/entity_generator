import * as changeCase from 'change-case'
import type { CommonPlaceholder, HibernatePlaceholder, Placeholder, Table } from '../types'
import { ENTITY_HBM_XML } from './templates'
import { builderBuild, datatypeHibernateMapping } from './utils'

export class EntityHibernateXmlBuilder {
  table: Table
  placeholders: Placeholder
  output: string
  template: string
  fileName: string
  hibernatePlaceholders: HibernatePlaceholder

  constructor(table: Table, common: CommonPlaceholder, output: string) {
    this.table = table
    this.placeholders = { ...common }
    this.output = `${output}/resources/jp/co/yamaha_motor/xm03/entity`
    this.template = ENTITY_HBM_XML
    this.fileName = '{Entity}.hbm.xml'

    this.hibernatePlaceholders = this.initHibernatePlaceholders()
  }

  initHibernatePlaceholders(): HibernatePlaceholder {
    return {
      ColumnsXML: '',
      ManyToOneXML: '',
      OneToManyXML: '',
    }
  }

  async build() {
    this.buildColumnsXML()
    this.buildManyToOneXML()
    this.buildOneToManyXML()
    this.placeholders = { ...this.placeholders, ...this.hibernatePlaceholders }
    await builderBuild(this.fileName, this.template, this.placeholders, this.output)
  }

  buildColumnsXML() {
    const columns = this.table.columns
    const columnsCase = columns.map(col => ({
      type: datatypeHibernateMapping(col.type),
      camelCase: changeCase.camelCase(col.name),
      columnName: col.name,
      length: col.config && col.config.length > 0 ? col.config.reduce((prev, curr) => prev + curr, 0) : undefined,
    }))
    this.hibernatePlaceholders.ColumnsXML = columnsCase.map(col =>
      `<property
        name="${col.camelCase}"
        type="${col.type}"
        column="${col.columnName}"
        ${col.length ? `length="${col.length}"` : ''}
      />`).join('\n')
  }

  buildManyToOneXML() {
    const manyToOne = this.table.manyToOne
    if (!manyToOne)
      return
    const manyToOneCase = manyToOne.map(mto => ({
      camelCase: `${changeCase.camelCase(mto.name)}Info`,
      columnName: mto.column,
      ref: `jp.co.yamaha_motor.xm03.common.entity.${mto.clz}`,
    }))
    this.hibernatePlaceholders.ManyToOneXML = manyToOneCase.map(mto =>
      `<many-to-one
        name="${mto.camelCase}"
        class="${mto.ref}"
      >
        <column name="${mto.columnName}" />
      </many-to-one>`).join('\n')
  }

  buildOneToManyXML() {
    const oneToMany = this.table.oneToMany
    if (!oneToMany)
      return
    const oneToManyCase = oneToMany.map(otm => ({
      camelCase: `${changeCase.camelCase(otm.name)}Infos`,
      columnName: otm.column,
      ref: `jp.co.yamaha_motor.xm03.common.entity.${otm.clz}`,
    }))
    this.hibernatePlaceholders.OneToManyXML = oneToManyCase.map(otm =>
      `<set
          name="${otm.camelCase}"
          lazy="true"
          inverse="true"
          cascade="all-delete-orphan"
      >
        <key>
            <column name="${otm.columnName}" />
        </key>

        <one-to-many
            class="${otm.ref}"
        />
      </set>`).join('\n')
  }
}
