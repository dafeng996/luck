import * as fs from 'fs'
import { promisify } from 'util'
import commander from './commander'

const stat = promisify(fs.stat)

/**
 * 判断路径是否为文件夹
 * @param {string} filePath
 * @return Promise<boolean>
 */
async function isDirectory(filePath:string):Promise<boolean> {
  try {
    return (await stat(filePath)).isDirectory()
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      return false
    }
    throw new error
  }
}

/**
 * 执行命令
 * @param {Array<string>} args
 * @param {string|null} text
 */
async function execute(args: string[], text: string | null = null): Promise<Number> {
  const sourcePaths = []
  const options = Object.assign({ path: '', deep: 5 },
    commander(args).getOptions()
  )
  
  if (options.path) {
    sourcePaths.push(options.path)
  } else if (!options.path && args.length > 2) {
    for (let i = 2; i < args.length; i++) {
      sourcePaths.push(args[i])
    }
  } else {
    sourcePaths.push('./')
  }

  sourcePaths.forEach(async path => {
    console.log(await isDirectory(path))
  })

  return 0
}

export default {
  execute
}
