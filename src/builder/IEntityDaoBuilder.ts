import type { Builder, GeneratorBuilderConfig } from '../types'
import CONSTANTS from '../constants'
import { I_ENTITY_DAO_JAVA } from './templates'
import { builderBuild } from './utils'

export class IEntityDaoBuilder {
  builder: Builder

  constructor(builderCfg: GeneratorBuilderConfig) {
    this.builder = {
      table: builderCfg.table,
      placeholders: { ...builderCfg.common },
      output: `${builderCfg.output}/java/${CONSTANTS.BASE_PATH_DAO}`,
      template: I_ENTITY_DAO_JAVA,
      fileName: `I{Entity}Dao.java`,
    }
  }

  async build() {
    await builderBuild(this.builder.fileName, this.builder.template, this.builder.placeholders, this.builder.output)
  }
}
