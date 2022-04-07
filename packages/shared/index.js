module.exports = {
  /**
   * 读取命令行输入
   * @returns {Promise<string>}
   */
  readStdin: async function () {
    return new Promise((resolve, reject) => {
      let content = ''
      let chunk = ''
      process.stdin
        .setEncoding('utf-8')
        .on('readable', () => {
          while ((chunk = process.stdin.read()) !== null) {
            content += chunk
          }
        })
        .on('end', () => resolve(content))
        .on('error', reject)
    })
  }
}
