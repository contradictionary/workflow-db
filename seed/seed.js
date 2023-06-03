import { prismaClient } from '../db-client.js';
import { seed_data_v1 } from './seed-data.js';//todo: parameterise this, decide which file to use
import { PrepareSeedData, ProcessSeedRecord } from './seed-common.js';
import { SEED_RECORD_OP_TYPE } from '../enums.js';
import { Logger } from '../../../common/logs.js';
let objLog = new Logger();
objLog.init('initial-data-seed');

async function main() {
    const to_be_processed = PrepareSeedData(seed_data_v1);
    for (let i = 0; i < to_be_processed.length; i++) {
        const table = to_be_processed[i];
        for (let j = 0; j < table.records.length; j++) {
            const record = table.records[j];
            let result = await ProcessSeedRecord(j, objLog, prismaClient, table.table, record, table.operation || SEED_RECORD_OP_TYPE.INSERT);
            console.log(result);
        }
    }
}


main().then(result => console.log(result)).catch(err => { throw err }).finally(() => {
    prismaClient.$disconnect();
    objLog.close();
})