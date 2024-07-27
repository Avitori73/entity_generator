# Entity Generator
> 通过 DDL 语句，加上 ManyToOne 和 OneToMany 配置，来生成对应的 Entity 类，包含有以下五种文件：`Entity.java`, `NullEntity.java`, `Entity.hbm.xml`, `IEntityDao.java`, `IEntityDaoImpl.java`。

## 环境要求
- Nodejs 最新TLS（可以使用 [volta](https://volta.sh/) 安装）
- pnpm 最新

## 使用
1. 安装依赖， [如果安装太慢需要配置阿里云镜像](https://juejin.cn/post/7238233943609966652)
```bash
pnpm install
```
2. 使用方法有两种：
   - 直接在目录文件夹下，修改 `config.yaml` 文件，配置完成后使用命令 `pnpm start`，即可生成一个 `output` 目录。
   - 使用 `pnpm build` 打包后会生成一个 `dist` 目录，目录中有一个 `index.mjs` 文件，在对应目录中创建一个 `config.yaml` 文件，配置完成后，使用命令`node index.mjs`，则对应目录中会生成对应的 `output` 目录。
3. `config.yaml` 文件配置说明：
```yaml
generators:
  - createSQL: |
      create entity {
        entity_id_
        ...
      }
    manyToOne:
      - name: parentEntity
        clz: ParentEntity
        column: parent_entity_id_
    oneToMany:
      - name: childEntity
        clz: ChildEntity
        column: entity_id_
    commonDb: true/false

infos:
  author: name
```
- `generator` 为一个数组，可以配置多张表同时生成，其中每个数据的对象配置字段如下：
  - `createSQL`：该 SQL 语句直接通过 DBeaver 的 DDL 完全复制即可。
  - `manyToOne`（Optional）：配置父表对象，其中 `name` 为 `camelCase`, `clz` 为 父表对应的 `Entity` 类名，`column` 对表中关联父表的字段名。
  - `oneToMany`（Optional）：配置子对象集合，其中 `name` 为 `camelCase`, `clz` 为 子表对应的 `Entity` 类名，`column` 为当前 `Entity` 对应的 `id`。
  - `commomDb`（Optional）：如果是 `cmmDb` 的 `Entity` 请配置为 `true`，默认为 `false`。
- `infos`：暂时只有配置一个 `author`。

> PS：当前版本只实现了我所遇到的需求需要解决的部分，后续有其他需求功能需要实现，可以联系我。:)
