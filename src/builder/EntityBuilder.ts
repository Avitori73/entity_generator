import * as changeCase from 'change-case'
import type { CommonPlaceholder, EntityPlaceholder, Placeholder, Table } from '../types'
import { ENTITY_JAVA } from './templates'
import { builderBuild, datatypeJavaMapping } from './utils'

export class EntityBuilder {
  table: Table
  placeholders: Placeholder
  output: string
  template: string
  fileName: string
  entityPlaceholder: EntityPlaceholder

  constructor(table: Table, common: CommonPlaceholder, output: string) {
    this.table = table
    this.placeholders = { ...common }
    this.output = `${output}/java/jp/co/yamaha_motor/xm03/common/entity`
    this.template = ENTITY_JAVA
    this.fileName = '{Entity}.java'
    this.entityPlaceholder = this.initPlaceholders()
  }

  initPlaceholders() {
    return {
      // imports
      manyToOneImports: '',
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
    this.placeholders = { ...this.placeholders, ...this.entityPlaceholder }
    await builderBuild(this.fileName, this.template, this.placeholders, this.output)
  }

  buildEntityColumns() {
    const columns = this.table.columns
    const columnsCases = columns.map(col => ({
      type: datatypeJavaMapping(col.type),
      camelCase: changeCase.camelCase(col.name),
      constantCase: changeCase.constantCase(col.name),
      pascalCase: changeCase.pascalCase(col.name),
    }))
    this.entityPlaceholder.ENTITY_COLUMNS_STATIC = columnsCases.map(col => `public static final String ${col.constantCase} = "${col.camelCase}";`).join('\n')
    this.entityPlaceholder.entityColumnsFields = columnsCases.map(col => `private ${col.type} ${col.camelCase};`).join('\n')
    this.entityPlaceholder.entityColumnsConstructorArg = columnsCases.map(col => `, ${col.type} ${col.camelCase}`).join('\n')
    this.entityPlaceholder.entityColumnsConstructorSet = columnsCases.map(col => `this.${col.camelCase} = ${col.camelCase};`).join('\n')
    this.entityPlaceholder.builderEntityColumnsFields = columnsCases.map(col => `private ${col.type} ${col.camelCase};`).join('\n')
    this.entityPlaceholder.builderEntityColumnsSetters = columnsCases.map(col =>
      `public Builder set${col.pascalCase}(${col.type} ${col.camelCase}) {
          this.${col.camelCase} = ${col.camelCase};
          return this;
      }`).join('\n')
    this.entityPlaceholder.builderEntityColumnsBuilds = columnsCases.map(col => `result.set${col.pascalCase}(${col.camelCase});`).join('\n')
    this.entityPlaceholder.entityColumnsSettersAndGetters = columnsCases.map(col =>
      `public ${col.type} get${col.pascalCase}() {
          return ${col.camelCase};
      }

      public void set${col.pascalCase}(${col.type} ${col.camelCase}) {
          this.${col.camelCase} = ${col.camelCase};
      }`).join('\n')
    this.entityPlaceholder.entityColumnsCopyFields = columnsCases.map(col => `this.${col.camelCase} = entity.get${col.pascalCase}();`).join('\n')
  }

  buildManyToOne() {
    const manyToOne = this.table.manyToOne
    if (!manyToOne)
      return
    const manyToOneCases = manyToOne.map(mto => ({
      type: mto.clz,
      Id: `${changeCase.pascalCase(mto.clz)}Id`,
      id: `${changeCase.camelCase(mto.clz)}Id`,
      dao: `${changeCase.camelCase(mto.clz)}Dao`,
      IDao: `I${changeCase.pascalCase(mto.clz)}Dao`,
      camelCase: `${changeCase.camelCase(mto.clz)}Info`,
      constantCase: `${changeCase.constantCase(mto.clz)}_INFO`,
      pascalCase: `${changeCase.pascalCase(mto.clz)}Info`,
    }))
    this.entityPlaceholder.MANY_TO_ONE_STATIC = manyToOneCases.map(mto => `public static final String ${mto.constantCase} = "${mto.camelCase}";`).join('\n')
    this.entityPlaceholder.manyToOneFields = manyToOneCases.map(mto => `private ${mto.type} ${mto.camelCase};`).join('\n')
    this.entityPlaceholder.manyToOneConstructorArg = manyToOneCases.map(mto => `, ${mto.type} ${mto.camelCase}`).join('\n')
    this.entityPlaceholder.manyToOneConstructorSet = manyToOneCases.map(mto => `this.${mto.camelCase} = ${mto.camelCase};`).join('\n')
    this.entityPlaceholder.builderManyToOneFields = manyToOneCases.map(mto =>
      `private String ${mto.id};
      private ${mto.type} ${mto.camelCase};
      private ${mto.IDao} ${mto.dao};`).join('\n')
    this.entityPlaceholder.manyToOneImports = manyToOneCases.map(mto => `import jp.co.yamaha_motor.xm03.common.dao.${mto.IDao};`).join('\n')
    this.entityPlaceholder.builderManyToOneDaoArg = manyToOneCases.map(mto => `${mto.IDao} ${mto.dao}`).join(',')
    this.entityPlaceholder.builderManyToOneDaoSet = manyToOneCases.map(mto => `this.${mto.dao} = ${mto.dao};`).join('\n')
    this.entityPlaceholder.builderManyToOneSetters = manyToOneCases.map(mto =>
      `public Builder set${mto.pascalCase}(${mto.type} ${mto.camelCase}) {
          this.${mto.camelCase} = ${mto.camelCase};
          return this;
      }
      
      public Builder set${mto.Id}(String ${mto.id}) {
          this.${mto.id} = ${mto.id};
          return this;
      }`).join('\n')
    this.entityPlaceholder.builderManyToOneBuilds = manyToOneCases.map(mto =>
      `if (StringUtils.isNotBlank(${mto.id}) && campaignDao.get(${mto.id}) != null){
          this.${mto.camelCase} = ${mto.dao}.get(${mto.id});
      }

      result.set${mto.pascalCase}(${mto.camelCase});`,
    ).join('\n')
    this.entityPlaceholder.manyToOneSettersAndGetters = manyToOneCases.map(mto =>
      `public ${mto.type} get${mto.pascalCase}() {
          return ${mto.camelCase};
      }
          
      public void set${mto.pascalCase}(${mto.type} ${mto.camelCase}) {
          this.${mto.camelCase} = ${mto.camelCase};
      }`).join('\n')
    this.entityPlaceholder.manyToOneCopyFields = manyToOneCases.map(mto => `this.${mto.camelCase} = entity.get${mto.pascalCase}();`).join('\n')
  }

  buildOneToMany() {
    const oneToMany = this.table.oneToMany
    if (!oneToMany)
      return
    const oneToManyCases = oneToMany.map(otm => ({
      type: otm.clz,
      camelCase: `${changeCase.camelCase(otm.clz)}Infos`,
      constantCase: `${changeCase.constantCase(otm.clz)}_INFOS`,
      pascalCase: `${changeCase.pascalCase(otm.clz)}Infos`,
    }))
    this.entityPlaceholder.ONE_TO_MANY_STATIC = oneToManyCases.map(otm => `public static final String ${otm.constantCase} = "${otm.camelCase}";`).join('\n')
    this.entityPlaceholder.oneToManyFields = oneToManyCases.map(otm => `private Set<${otm.type}> ${otm.camelCase} = new HashSet<${otm.type}>();`).join('\n')
    this.entityPlaceholder.oneToManyConstructorArg = oneToManyCases.map(otm => `, Set<${otm.type}> ${otm.camelCase}`).join('\n')
    this.entityPlaceholder.oneToManyConstructorSet = oneToManyCases.map(otm => `this.${otm.camelCase} = ${otm.camelCase};`).join('\n')
    this.entityPlaceholder.builderOneToManyFields = oneToManyCases.map(otm => `private Set<IBuilder> ${otm.camelCase} = new HashSet<IBuilder>();`).join('\n')
    this.entityPlaceholder.builderOneToManySetters = oneToManyCases.map(otm =>
      `public Builder set${otm.pascalCase}(Set<IBuilder> ${otm.camelCase}) {
          this.${otm.camelCase}.add(${otm.camelCase});
          return this;
      }`).join('\n')
    this.entityPlaceholder.builderOneToManyBuilds = oneToManyCases.map(otm =>
      `for (IBuilder<${otm.type}> member : ${otm.camelCase}) {
          ${otm.type}.Builder builder = (${otm.type}.Builder) member;
          builder.set${otm.pascalCase}(result);
          result.get${otm.pascalCase}().add(member.build());
      }`).join('\n')
    this.entityPlaceholder.oneToManySettersAndGetters = oneToManyCases.map(otm =>
      `public Set<${otm.type}> get${otm.pascalCase}() {
          return ${otm.camelCase};
      }
      
      public void set${otm.pascalCase}(Set<${otm.type}> ${otm.camelCase}) {
          this.${otm.camelCase} = ${otm.camelCase};
      }`).join('\n')
    this.entityPlaceholder.oneToManyCopyFields = oneToManyCases.map(otm => `this.${otm.camelCase} = entity.get${otm.pascalCase}();`).join('\n')
  }
}
