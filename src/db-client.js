import { PrismaClient } from '@prisma/client';
let objDBLogger;
export function SetLogger(log) { objDBLogger = log; return log };
export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'error',
        },
        // {
        //     emit: 'event',
        //     level: 'query',
        // }
    ],
});
prismaClient.$on('error', (e) => { objDBLogger.error(`timestamp|${e.timestamp}|message|${e.message}|target|${e.target}`) });
prismaClient.$on('query', (e) => { 
    objDBLogger.debug(`timestamp|${e.timestamp}|duration|${e.duration}|query|${e.query}`)
});
const pragmas = ['journal_mode = WAL'];
export function RunPragma() {
    pragmas.forEach((item) => prismaClient.$executeRaw`PRAGMA ${item}`);
    return true;
}

export async function RunDB() {
    objDBLogger.init('db-logs');
    let ret = RunPragma();
    return ret;
}
export async function CloseDB() {
    objDBLogger.close();
    return prismaClient.$disconnect();
}
