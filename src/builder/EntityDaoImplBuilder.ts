import type { Builder, GeneratorBuilderConfig } from '../types'
import CONSTANTS from '../constants'
import { ENTITY_DAO_IMPL_JAVA } from './templates'
import { builderBuild } from './utils'

export class EntityDaoImplBuilder {
  builder: Builder

  constructor(builderCfg: GeneratorBuilderConfig) {
    this.builder = {
      table: builderCfg.table,
      placeholders: { ...builderCfg.common },
      output: `${builderCfg.output}/java/${CONSTANTS.BASE_PATH_DAO_IMPL}`,
      template: ENTITY_DAO_IMPL_JAVA,
      fileName: `{Entity}DaoImpl.java`,
    }
  }

  async build() {
    await builderBuild(this.builder.fileName, this.builder.template, this.builder.placeholders, this.builder.output)
  }
}
