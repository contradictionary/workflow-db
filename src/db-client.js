import { PrismaClient } from '@prisma/client';
import { ADMIN_ROLE_NAME, BASIC_ROLE_NAME, SESSION_STATUS } from './enums.js';
// import { LogDebug, LogInfo, Logger } from '../../common/logs.js';
export const prismaClient = new PrismaClient({
    log: [
        // {
        //     emit: 'event',
        //     level: 'query',
        // },
        {
            emit: 'event',
            level: 'error',
        },
        // {
        //     emit: 'event',
        //     level: 'info',
        // },
        // {
        //     emit: 'event',
        //     level: 'warn',
        // },
    ],
});
// prismaClient.$use((params,next)=>{
//     next(params);
// });
// prismaClient.$on('query', (e) => objLog.log(`query|${e.query}|params|${e.params}|duration|${e.duration}`));
// prismaClient.$on('warn', (e) => objLog.warn(`timestamp|${e.timestamp}|message|${e.message}|target|${e.target}`));
// prismaClient.$on('info', (e) => objLog.debug(`timestamp|${e.timestamp}|message|${e.message}|target|${e.target}`));
prismaClient.$on('error', (e) => {/*objLog.error(`timestamp|${e.timestamp}|message|${e.message}|target|${e.target}`)*/ });
const pragmas = ['journal_mode = WAL'];
export function RunPragma() {
    pragmas.forEach((item) => prismaClient.$executeRaw`PRAGMA ${item}`);
    return true;
}
// export async function UpdateDBValues() {
//     let role = await prismaClient.userroles.findFirst({ where: { name: BASIC_ROLE_NAME } });
//     if (role) {
//         setBasicRoleId(role.id);
//         // LogDebug('Basic user role Id', role.id);
//     }

//     role = await prismaClient.userroles.findFirst({ where: { name: ADMIN_ROLE_NAME } });
//     if (role) {
//         setAdminRoleId(role.id);
//         // LogDebug('admin user role Id', role.id);
//     }
//     let result = await moveAllsessions();
//     // if (result) LogInfo('sessions cleared', result.length / 2);
//     return true;
// }
async function moveAllsessions() {
    let sessions = await prismaClient.usersessions.findMany();
    if (!sessions || !sessions.length) return;

    let batches = [];

    for (let i = 0; i < sessions.length; i++) {
        sessions[i].status = SESSION_STATUS.DEACTIVE;
        delete sessions[i].modifiedon;
        batches.push(prismaClient.oldsessions.create({ data: sessions[i] }));
        batches.push(prismaClient.usersessions.delete({ where: { id: sessions[i].id } }));
    }

    return prismaClient.$transaction(batches);
}
export async function RunDB() {
    // objLog.init('db-logs');
    let ret = RunPragma();
    // let ret1 = await UpdateDBValues();

    return ret //&& ret1;
}
export async function CloseDB() {
    // objLog.close();
    return prismaClient.$disconnect();
}
