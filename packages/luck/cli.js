/**
 * Main CLI object
 * @author 大风
 */

"use strict";

const fs = require('fs'),
  path = require('path'),
  { promisify } = require('util')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const basePath = path.resolve('./')
const excludes = require('./luck.json').excludes
const fileTypes = require('./luck.json').fileTypes
const ig = require('ignore').default().add(excludes)

/**
 * 判断是否文件夹
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
async function isDirectory(filePath) {
  try {
    return (await stat(filePath)).isDirectory()
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      return false
    }
    throw error
  }
}

const cli = {
  /**
   * 执行
   * @param {string|Array|Object} args
   * @param {string} text
   * @return {Promise<number>}
   */
  async execute(args, text) {
    const paths = []

    const getFilesPath = async (p) => {
      if (!await isDirectory(p)) {
        const reg = new RegExp(fileTypes)
        if (!ig.ignores(path.relative(basePath, p)) && reg.test(p)) {
          paths.push(p)
        }
        return 0
      }

      const fp = await readdir(p)
      for(const _p of fp) {
        await getFilesPath(path.join(p, _p))
      }
    }

    await getFilesPath(basePath)
    return 0
  }
}

module.exports = cli
