import fsp from 'node:fs/promises'
import t from 'consola'
import yaml from 'yaml'
import { EntityGenerator } from './EntityGenerator'
import { clearOutput } from './builder'

export async function main() {
  const config = await fsp.readFile('./config.yaml', 'utf-8')
  const pkg = await fsp.readFile('./package.json', 'utf-8')
  const { version } = JSON.parse(pkg)
  const cfg = yaml.parse(config)

  t.info('Start generating entities...')
  t.info('Clearing output directory...')
  clearOutput(cfg.output || './output')
  t.info('Output directory cleared')

  const { generators, infos } = cfg

  for (const generator of generators) {
    const entityGenerator = new EntityGenerator({ ...generator, placeholder: { ...infos, version } })
    await entityGenerator.build()
  }
}

main()
