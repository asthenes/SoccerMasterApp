#!/usr/bin/env node
import yargs from 'yargs'
import { main } from './main';

const options = yargs
.usage('yarn cli -f or node <path to src/main.js> -f will prompt for file')
.usage('you can provide a file on start: -f <path to file>')
.usage('pipes: <your app> | node <path to src/main.js>')
.usage('redirects: node <path to src/main.js> < <your app>')
.option('f', {alias: 'file', describe: 'specifes that data will be from a file', type: 'string', demandOption: false})
.argv;

main(options.f)