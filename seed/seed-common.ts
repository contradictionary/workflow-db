import { PrismaClient, Prisma, users } from "@prisma/client";
import { SALR_ROUNDS, SEED_RECORD_OP_TYPE, TABLE_FIELDS_NAMES, TABLE_NAMES, seeed_data_type } from "./enums";
import bcrypt from 'bcrypt';
const sortOrder = [TABLE_NAMES.USERROLES, TABLE_NAMES.USERACL, TABLE_NAMES.USERS, TABLE_NAMES.LIST, TABLE_NAMES.LISTVALUES]
const restircted = [TABLE_NAMES.USERSESSIONS]

export function PrepareSeedData(seeddata: seeed_data_type) {
    let data: seeed_data_type = [];
    let error = false;

    for (let i = 0; i < sortOrder.length; i++) {
        const tableName = sortOrder[i];
        let item = seeddata.find((table) => {
            let s = 0;
            table.records.forEach((record) => {
                s++;
                if ((table.operation == SEED_RECORD_OP_TYPE.UPDATE || table.operation == SEED_RECORD_OP_TYPE.DELETE) && !record.hasOwnProperty('id')) {
                    console.log('missing id field table:' + tableName + ' on record at index :' + s)
                    error = true;
                }
            })
            return restircted.indexOf(table.table) == -1 && table.table == tableName
        });
        if (item)
            data.push(item);
    }
    if (error) {
        console.warn('seed data contains error , please fix those and run again!');
        return [];
    }
    return data;
}

async function insertRecord(prism: any, tableName: string, record: Record<string, any>) {
    return prism[tableName].create({ data: { ...(record as users) } });
}
async function updateRecord(prism: any, tableName: string, record: Record<string, any>) {
    return prism[tableName].update({ data: { ...(record as users) }, where: { id: record.id } });
}
async function deleteRecord(prism: any, tableName: string, record: Record<string, any>) {
    return prism[tableName].delete({ where: { id: record.id } });
}

export async function ProcessSeedRecord(prism: any, tableName: string, record: Record<string, any>, op: SEED_RECORD_OP_TYPE) {
    if (tableName == TABLE_NAMES.USERS && op != SEED_RECORD_OP_TYPE.DELETE) {
        record[TABLE_FIELDS_NAMES.USERS.PASSWORD] = await GeneratePassword(record[TABLE_FIELDS_NAMES.USERS.PASSWORD])
    }

    if (op == SEED_RECORD_OP_TYPE.DELETE)
        return deleteRecord(prism, tableName, record);
    else if (op == SEED_RECORD_OP_TYPE.UPDATE)
        return updateRecord(prism, tableName, record);
    else
        return insertRecord(prism, tableName, record);
}

export async function GeneratePassword(pwd: string) {
    let salt = await bcrypt.genSalt(SALR_ROUNDS);
    let encrypted = await bcrypt.hash(pwd, salt);
    return encrypted;
}