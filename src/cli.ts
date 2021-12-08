#!/usr/bin/env node
import yargs from 'yargs'
import { main } from './main';

const options = yargs
.usage('yarn cli -f will prompt for file')
.usage('you can also provide a file on start: -f <path to file>')
.usage('pipes: <your app> | yarn cli')
.usage('redirects: yarn cli < <path to file>')
.option('f', {alias: 'file', describe: 'specifes that data will be from a file', type: 'string', demandOption: false})
.argv;

main(options.f)