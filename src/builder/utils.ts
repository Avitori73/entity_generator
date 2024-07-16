import fsp from 'node:fs/promises'
import t from 'consola'
import c from 'picocolors'
import * as rimraf from 'rimraf'
import type { Placeholder } from '../types'
import { formatForJava, formatForXml } from '../format'

export function extractPlaceholders(content: string): string[] {
  const regex = /\{\w*\}/g
  const matches = content.match(regex)
  if (!matches)
    return []
  const placeholder = new Set<string>()
  for (const match of matches) {
    placeholder.add(match)
  }
  return Array.from(placeholder)
}

export function replacePlaceholders(content: string, placeholders: string[], values: Placeholder) {
  let result = content

  const missingPlaceholder = placeholders.filter(placeholder => values[outBrackets(placeholder)] === undefined)
  if (missingPlaceholder.length > 0)
    t.error(c.red('MissMatch Placeholder:'), '[', missingPlaceholder.map(placeholder => c.green(placeholder)).join(', '), ']')

  for (const placeholder of placeholders) {
    const value = values[outBrackets(placeholder)]
    result = result.replaceAll(placeholder, value)
  }

  return result
}

export async function builderBuild(fileName: string, template: string, placeholders: Placeholder, outputPath: string) {
  const fname = fileName.replaceAll('{Entity}', placeholders.Entity)
  t.info(c.blue(`Building ${fname}`))
  const phs = extractPlaceholders(template)
  let result = replacePlaceholders(template, phs, placeholders)
  if (fname.endsWith('.java')) {
    result = await formatForJava(result)
  }
  else if (fname.endsWith('.xml')) {
    result = await formatForXml(result)
  }
  await fsp.mkdir(outputPath, { recursive: true })
  await fsp.writeFile(`${outputPath}/${fname}`, result)
  t.success(c.green(`Build ${fname} success`))
}

function outBrackets(content: string): string {
  const regex = /\{(.*?)\}/
  const matches = content.match(regex)
  return matches ? matches[1] : ''
}

const DATATYPE_HIBERNATE_MAPPING = new Map<string, string>([
  ['varchar', 'java.lang.String'],
  ['numeric', 'java.math.BigDecimal'],
  ['int4', 'java.lang.Integer'],
  ['timestampz', 'java.sql.Timestamp'],
])

const DATATYPE_JAVA_MAPPING = new Map<string, string>([
  ['varchar', 'String'],
  ['numeric', 'BigDecimal'],
  ['int4', 'Integer'],
  ['timestampz', 'Date'],
])

export function datatypeJavaMapping(datatype: string) {
  return DATATYPE_JAVA_MAPPING.get(datatype) || 'String'
}

export function datatypeHibernateMapping(datatype: string) {
  return DATATYPE_HIBERNATE_MAPPING.get(datatype) || 'java.lang.String'
}

export function clearOutput(outputPath: string) {
  rimraf.sync(outputPath)
}
