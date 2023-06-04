import { CloseDB, RunDB, SetLogger as SetLogObj, prismaClient } from './src/db-client.js'
export const Close = CloseDB;
export const Run = RunDB;
export const Client = prismaClient
export * as enums from './enums.js'
export const SetLogger = SetLogObj