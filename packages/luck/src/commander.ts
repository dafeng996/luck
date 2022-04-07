import { Command } from 'commander'

const program = new Command()
program
  .description('luck')
  .version(require('../package.json').version)
  .option('-p, --path <path>', 'set path')
  .option('-d, --deep <deep>', 'set deep')

export default function (args: string[]) {
  program.parse(args)
  return {
    getOptions() {
      return program.opts()
    }
  }
}
