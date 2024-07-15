import fsp from 'node:fs/promises'
import t from 'consola'
import c from 'picocolors'
import type { Placeholder } from '../types'

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

  const missingPlaceholder = placeholders.filter(placeholder => !values[outBrackets(placeholder)])
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
  const result = replacePlaceholders(template, phs, placeholders)
  await fsp.mkdir(outputPath, { recursive: true })
  await fsp.writeFile(`${outputPath}/${fname}`, result)
  t.success(c.green(`Build ${fname} success`))
}

function outBrackets(content: string): string {
  const regex = /\{(.*?)\}/
  const matches = content.match(regex)
  return matches ? matches[1] : ''
}
