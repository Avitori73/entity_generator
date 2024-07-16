import { promises as fs } from 'node:fs'
import { format } from 'prettier'
import xmlFormat from 'xml-formatter'
import { sync as globSync } from 'glob'

// Prettier 配置
const prettierConfig = {
  tabWidth: 4,
  printWidth: 200,
  plugins: ['prettier-plugin-java'],
}

export async function formatFiles() {
  // 获取所有 Java 文件
  const files = globSync('output/**/*.java', {
    ignore: ['node_modules/**', '.git/**'],
    nodir: true,
  })

  for (const file of files) {
    const fileContent = await fs.readFile(file, 'utf8')
    const formatted = await format(fileContent, { ...prettierConfig, filepath: file })

    await fs.writeFile(file, formatted)
  }
}

export async function formatForJava(javaContent: string) {
  return await format(javaContent, { ...prettierConfig, parser: 'java' })
}

export async function formatForXml(content: string) {
  return xmlFormat(content)
}
