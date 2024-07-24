import * as changeCase from 'change-case'
import type { Builder, GeneratorBuilderConfig, HibernatePlaceholder } from '../types'
import CONSTANTS from '../constants'
import { ENTITY_HBM_XML } from './templates'
import { builderBuild, datatypeHibernateMapping } from './utils'

export class EntityHibernateXmlBuilder {
  builder: Builder
  hibernatePlaceholders: HibernatePlaceholder

  constructor(builderCfg: GeneratorBuilderConfig) {
    this.builder = {
      commonDb: builderCfg.commonDb,
      table: builderCfg.table,
      placeholders: builderCfg.common,
      output: `${builderCfg.output}/java/${builderCfg.commonDb ? CONSTANTS.BASE_PATH_ENTITY_CMMDB : CONSTANTS.BASE_PATH_ENTITY_LOCAL}`,
      template: ENTITY_HBM_XML,
      fileName: '{Entity}.hbm.xml',
    }
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
    this.builder.placeholders = { ...this.builder.placeholders, ...this.hibernatePlaceholders }
    await builderBuild(this.builder.fileName, this.builder.template, this.builder.placeholders, this.builder.output)
  }

  /**
   * Generator property XML
   * <property
   *  name="entityCol"
   *  type="java.lang.String"
   *  column="entity_col_"
   *  length="255"
   * />
   */
  buildColumnsXML() {
    const columns = this.builder.table.columns
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

  /**
   * Generator many-to-one XML
   * <many-to-one
   *  name="ParentEntityInfo"
   *  class="PATH_LOCAL_OR_CMMDB.ParentEntity"
   * >
   *    <column name="parent_entity_id_" />
   * </many-to-one>
   */
  buildManyToOneXML() {
    const commonDb = this.builder.commonDb || false
    const manyToOne = this.builder.table.manyToOne
    if (!manyToOne)
      return
    const manyToOneCase = manyToOne.map(mto => ({
      camelCase: `${changeCase.camelCase(mto.name)}Info`,
      columnName: mto.column,
      ref: `${commonDb ? CONSTANTS.BASE_LOC_ENTITY_CMMDB : CONSTANTS.BASE_LOC_ENTITY_LOCAL}.${mto.clz}`,
    }))
    this.hibernatePlaceholders.ManyToOneXML = manyToOneCase.map(mto =>
      `<many-to-one
        name="${mto.camelCase}"
        class="${mto.ref}"
      >
        <column name="${mto.columnName}" />
      </many-to-one>`).join('\n')
  }

  /**
   * Generator one-to-many XML
   * <set
   *   name="ChildEntityInfos"
   *   lazy="true"
   *   inverse="true"
   *   cascade="all-delete-orphan"
   * >
   *   <key>
   *     <column name="parent_entity_id_" />
   *   </key>
   *   <one-to-many
   *     class="PATH_LOCAL_OR_CMMDB.ChildEntity"
   *   />
   * </set>
   */
  buildOneToManyXML() {
    const commonDb = this.builder.commonDb || false
    const oneToMany = this.builder.table.oneToMany
    if (!oneToMany)
      return
    const oneToManyCase = oneToMany.map(otm => ({
      camelCase: `${changeCase.camelCase(otm.name)}Infos`,
      columnName: otm.column,
      ref: `${commonDb ? CONSTANTS.BASE_LOC_ENTITY_CMMDB : CONSTANTS.BASE_LOC_ENTITY_LOCAL}.${otm.clz}`,
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
