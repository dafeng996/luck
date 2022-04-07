#!/usr/bin/env node

"use strict"

const cli = require('../dist/cli').default
const { readStdin } = require('shared')

;(async function main() {
  process.exitCode = await cli.execute(process.argv, process.argv.includes('--stdin') ? await readStdin() : null)
})()
