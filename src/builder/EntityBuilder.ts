import * as changeCase from 'change-case'
import CONSTANTS from '../constants'
import type { Builder, EntityPlaceholder, GeneratorBuilderConfig } from '../types'
import { ENTITY_JAVA } from './templates'
import { builderBuild, datatypeJavaMapping } from './utils'

const commonDbImports = [
  'import jp.co.yamaha_motor.xm03.common.entity.AbstractBaseEntity;',
  'import jp.co.yamaha_motor.xm03.common.entity.INullable;',
]

export class EntityBuilder {
  builder: Builder
  entityPlaceholder: EntityPlaceholder

  constructor(builderCfg: GeneratorBuilderConfig) {
    this.builder = {
      commonDb: builderCfg.commonDb,
      table: builderCfg.table,
      placeholders: { ...builderCfg.common },
      output: `${builderCfg.output}/java/${builderCfg.commonDb ? CONSTANTS.BASE_PATH_ENTITY_CMMDB : CONSTANTS.BASE_PATH_ENTITY_LOCAL}`,
      template: ENTITY_JAVA,
      fileName: `{Entity}.java`,
    }
    this.entityPlaceholder = this.initPlaceholders()
    if (builderCfg.commonDb) {
      this.entityPlaceholder.commonDbImports = commonDbImports.join('\n')
    }
  }

  initPlaceholders() {
    return {
      // imports
      manyToOneImports: '',
      commonDbImports: '',
      // static
      ENTITY_COLUMNS_STATIC: '',
      MANY_TO_ONE_STATIC: '',
      ONE_TO_MANY_STATIC: '',
      // fields
      entityColumnsFields: '',
      manyToOneFields: '',
      oneToManyFields: '',
      // constructor args
      entityColumnsConstructorArg: '',
      manyToOneConstructorArg: '',
      oneToManyConstructorArg: '',
      // constructor sets
      entityColumnsConstructorSet: '',
      manyToOneConstructorSet: '',
      oneToManyConstructorSet: '',
      // builder
      builderEntityColumnsFields: '',
      builderManyToOneFields: '',
      builderOneToManyFields: '',
      // builder constructor
      builderManyToOneDaoArg: '',
      builderManyToOneDaoSet: '',
      // builder setters
      builderManyToOneSetters: '',
      builderEntityColumnsSetters: '',
      builderOneToManySetters: '',
      // builder build
      builderEntityColumnsBuilds: '',
      builderManyToOneBuilds: '',
      builderOneToManyBuilds: '',
      // setters & getters
      entityColumnsSettersAndGetters: '',
      manyToOneSettersAndGetters: '',
      oneToManySettersAndGetters: '',
      // copy fields
      entityColumnsCopyFields: '',
      manyToOneCopyFields: '',
      oneToManyCopyFields: '',
    }
  }

  async build() {
    this.buildEntityColumns()
    this.buildManyToOne()
    this.buildOneToMany()
    this.builder.placeholders = { ...this.builder.placeholders, ...this.entityPlaceholder }
    await builderBuild(this.builder.fileName, this.builder.template, this.builder.placeholders, this.builder.output)
  }

  buildEntityColumns() {
    const holder = this.entityPlaceholder
    const columns = this.builder.table.columns
    const columnsCases = columns.map(col => ({
      type: datatypeJavaMapping(col.type),
      camelCase: changeCase.camelCase(col.name),
      constantCase: changeCase.constantCase(col.name),
      pascalCase: changeCase.pascalCase(col.name),
    }))

    holder.ENTITY_COLUMNS_STATIC = columnsCases.map(col => `public static final String ${col.constantCase} = "${col.camelCase}";`).join('\n')
    holder.entityColumnsFields = columnsCases.map(col => `private ${col.type} ${col.camelCase};`).join('\n')
    holder.entityColumnsConstructorArg = columnsCases.map(col => `, ${col.type} ${col.camelCase}`).join('\n')
    holder.entityColumnsConstructorSet = columnsCases.map(col => `this.${col.camelCase} = ${col.camelCase};`).join('\n')
    holder.builderEntityColumnsFields = columnsCases.map(col => `private ${col.type} ${col.camelCase};`).join('\n')
    holder.builderEntityColumnsSetters = columnsCases.map(col =>
      `public Builder set${col.pascalCase}(${col.type} ${col.camelCase}) {
          this.${col.camelCase} = ${col.camelCase};
          return this;
      }`).join('\n')
    holder.builderEntityColumnsBuilds = columnsCases.map(col => `result.set${col.pascalCase}(${col.camelCase});`).join('\n')
    holder.entityColumnsSettersAndGetters = columnsCases.map(col =>
      `public ${col.type} get${col.pascalCase}() {
          return ${col.camelCase};
      }

      public void set${col.pascalCase}(${col.type} ${col.camelCase}) {
          this.${col.camelCase} = ${col.camelCase};
      }`).join('\n')
    holder.entityColumnsCopyFields = columnsCases.map(col => `this.${col.camelCase} = entity.get${col.pascalCase}();`).join('\n')
  }

  buildManyToOne() {
    const holder = this.entityPlaceholder
    const manyToOne = this.builder.table.manyToOne
    if (!manyToOne)
      return
    const manyToOneCases = manyToOne.map(mto => ({
      type: mto.clz,
      Id: `${changeCase.pascalCase(mto.clz)}Id`,
      id: `${changeCase.camelCase(mto.clz)}Id`,
      dao: `${changeCase.camelCase(mto.clz)}Dao`,
      IDao: `I${changeCase.pascalCase(mto.clz)}Dao`,
      camelCase: `${changeCase.camelCase(mto.clz)}Info`,
      constantCase: `ENTITY_${changeCase.constantCase(mto.clz)}_INFO`,
      pascalCase: `${changeCase.pascalCase(mto.clz)}Info`,
    }))
    holder.MANY_TO_ONE_STATIC = manyToOneCases.map(mto => `public static final String ${mto.constantCase} = "${mto.camelCase}";`).join('\n')
    holder.manyToOneFields = manyToOneCases.map(mto => `private ${mto.type} ${mto.camelCase};`).join('\n')
    holder.manyToOneConstructorArg = manyToOneCases.map(mto => `, ${mto.type} ${mto.camelCase}`).join('\n')
    holder.manyToOneConstructorSet = manyToOneCases.map(mto => `this.${mto.camelCase} = ${mto.camelCase};`).join('\n')
    holder.builderManyToOneFields = manyToOneCases.map(mto =>
      `private String ${mto.id};
      private ${mto.type} ${mto.camelCase};
      private ${mto.IDao} ${mto.dao};`).join('\n')
    holder.manyToOneImports = manyToOneCases.map(mto => `import jp.co.yamaha_motor.xm03.common.dao.${mto.IDao};`).join('\n')
    holder.builderManyToOneDaoArg = manyToOneCases.map(mto => `${mto.IDao} ${mto.dao}`).join(',')
    holder.builderManyToOneDaoSet = manyToOneCases.map(mto => `this.${mto.dao} = ${mto.dao};`).join('\n')
    holder.builderManyToOneSetters = manyToOneCases.map(mto =>
      `public Builder set${mto.pascalCase}(${mto.type} ${mto.camelCase}) {
          this.${mto.camelCase} = ${mto.camelCase};
          return this;
      }
      
      public Builder set${mto.Id}(String ${mto.id}) {
          this.${mto.id} = ${mto.id};
          return this;
      }`).join('\n')
    holder.builderManyToOneBuilds = manyToOneCases.map(mto =>
      `if (StringUtils.isNotBlank(${mto.id}) && ${mto.dao}.get(${mto.id}) != null){
          this.${mto.camelCase} = ${mto.dao}.get(${mto.id});
      }

      result.set${mto.pascalCase}(${mto.camelCase});`,
    ).join('\n')
    holder.manyToOneSettersAndGetters = manyToOneCases.map(mto =>
      `public ${mto.type} get${mto.pascalCase}() {
          return ${mto.camelCase};
      }
          
      public void set${mto.pascalCase}(${mto.type} ${mto.camelCase}) {
          this.${mto.camelCase} = ${mto.camelCase};
      }`).join('\n')
    holder.manyToOneCopyFields = manyToOneCases.map(mto => `this.${mto.camelCase} = entity.get${mto.pascalCase}();`).join('\n')
  }

  buildOneToMany() {
    const holder = this.entityPlaceholder
    const oneToMany = this.builder.table.oneToMany
    if (!oneToMany)
      return
    const oneToManyCases = oneToMany.map(otm => ({
      type: otm.clz,
      camelCase: `${changeCase.camelCase(otm.clz)}Infos`,
      constantCase: `ENTITY_${changeCase.constantCase(otm.clz)}_INFOS`,
      pascalCase: `${changeCase.pascalCase(otm.clz)}Infos`,
      selfPascalCase: `${changeCase.pascalCase(this.builder.table.name)}Info`,
    }))
    holder.ONE_TO_MANY_STATIC = oneToManyCases.map(otm => `public static final String ${otm.constantCase} = "${otm.camelCase}";`).join('\n')
    holder.oneToManyFields = oneToManyCases.map(otm => `private Set<${otm.type}> ${otm.camelCase} = new HashSet<${otm.type}>();`).join('\n')
    holder.oneToManyConstructorArg = oneToManyCases.map(otm => `, Set<${otm.type}> ${otm.camelCase}`).join('\n')
    holder.oneToManyConstructorSet = oneToManyCases.map(otm => `this.${otm.camelCase} = ${otm.camelCase};`).join('\n')
    holder.builderOneToManyFields = oneToManyCases.map(otm => `private Set<IBuilder> ${otm.camelCase} = new HashSet<IBuilder>();`).join('\n')
    holder.builderOneToManySetters = oneToManyCases.map(otm =>
      `public Builder set${otm.pascalCase}(IBuilder ${otm.camelCase}) {
          this.${otm.camelCase}.add(${otm.camelCase});
          return this;
      }`).join('\n')
    holder.builderOneToManyBuilds = oneToManyCases.map(otm =>
      `for (IBuilder<${otm.type}> member : ${otm.camelCase}) {
          ${otm.type}.Builder builder = (${otm.type}.Builder) member;
          builder.set${otm.selfPascalCase}(result);
          result.get${otm.pascalCase}().add(member.build());
      }`).join('\n')
    holder.oneToManySettersAndGetters = oneToManyCases.map(otm =>
      `public Set<${otm.type}> get${otm.pascalCase}() {
          return ${otm.camelCase};
      }
      
      public void set${otm.pascalCase}(Set<${otm.type}> ${otm.camelCase}) {
          this.${otm.camelCase} = ${otm.camelCase};
      }`).join('\n')
    holder.oneToManyCopyFields = oneToManyCases.map(otm => `this.${otm.camelCase} = entity.get${otm.pascalCase}();`).join('\n')
  }
}
