import type { Builder, GeneratorBuilderConfig } from '../types'
import CONSTANTS from '../constants'
import { NULL_ENTITY_JAVA } from './templates'
import { builderBuild } from './utils'

export class NullEntityBuilder {
  builder: Builder

  constructor(builderCfg: GeneratorBuilderConfig) {
    this.builder = {
      table: builderCfg.table,
      placeholders: { ...builderCfg.common },
      output: `${builderCfg.output}/java/${CONSTANTS.BASE_PATH_DAO}`,
      template: NULL_ENTITY_JAVA,
      fileName: 'Null{Entity}.java',
    }
  }

  async build() {
    await builderBuild(this.builder.fileName, this.builder.template, this.builder.placeholders, this.builder.output)
  }
}
