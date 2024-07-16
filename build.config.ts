import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    'prettier',
    'glob',
    'pgsql-ast-parser',
    'consola',
    'picocolors',
    'rimraf',
    'xml-formatter',
    'change-case',
  ],
})
