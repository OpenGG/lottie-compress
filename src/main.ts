#!/usr/bin/env node

import { lottieTiny } from "./lottieTiny.js";

// @ts-ignore
import { readJSON, outputJSON } from 'fs-extra/esm'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const main = async () => {
  const args = yargs(hideBin(process.argv))
    .command('$0 <input> <output>', 'the default command')
    .option('tiny', {
      alias: 't',
      type: 'string',
      default: 'pngquant:{}',
      coerce: (tiny) => {
        if (tiny.startsWith('tinypng')) {
          return {
            type: 'tinypng',
          }
        }
        const pngquantPrefix = 'pngquant:'
        if (tiny.startsWith(pngquantPrefix)) {
          const json = tiny.slice(pngquantPrefix.length) || '{}'
          return {
            type: 'pngquant',
            options: JSON.parse(json)
          }
        }

        throw new Error('Invalid tiny options')
      }
    })

  const {
    input,
    output,
    tiny,
  } = args.argv

  const inputJson = await readJSON(input as string)

  const outJson = await lottieTiny(inputJson, tiny as any)

  await outputJSON(output as string, outJson)
}

await main()
