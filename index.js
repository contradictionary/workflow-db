import { CloseDB, RunDB, prismaClient } from './src/db-client.js'
export default {
    Close: CloseDB,
    Run: RunDB,
    Client: prismaClient
}