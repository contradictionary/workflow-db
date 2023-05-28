import { PrismaClient } from '@prisma/client';
import { seed_data_v1 } from './seed-data';//todo: parameterise this, decide which file to use
import { PrepareSeedData, ProcessSeedRecord } from './seed-common';
import { SEED_RECORD_OP_TYPE, seeed_data_type } from './enums';


const prisma = new PrismaClient({ log: ['query'] });
const to_be_processed: seeed_data_type = PrepareSeedData(seed_data_v1);

async function main() {
    for (let i = 0; i < to_be_processed.length; i++) {
        const table = to_be_processed[i];
        for (let j = 0; j < table.records.length; j++) {
            const record = table.records[j];
            let result = await ProcessSeedRecord(prisma, table.table, record, table.operation || SEED_RECORD_OP_TYPE.INSERT);
            console.log(result);
        }
    }
}


main().then(result => console.log(result)).catch(err => { throw err }).finally(() => {
    prisma.$disconnect();
})