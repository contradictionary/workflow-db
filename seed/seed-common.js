import { PrismaClient } from "@prisma/client";
import { SALR_ROUNDS, SEED_RECORD_OP_TYPE, TABLE_FIELDS_NAMES, TABLE_NAMES } from "../enums.js";
import bcrypt from 'bcrypt';
import { LogInfo, Logger } from "../../../common/logs.js";
const sortOrder = [TABLE_NAMES.USERROLES, TABLE_NAMES.USERACL, TABLE_NAMES.USERS, TABLE_NAMES.LIST, TABLE_NAMES.LISTVALUES]
const restircted = [TABLE_NAMES.USERSESSIONS]

export function PrepareSeedData(seeddata) {
    let data = [];
    let error = false;

    for (let i = 0; i < sortOrder.length; i++) {
        const tableName = sortOrder[i];
        let item = seeddata.find((table) => {
            let s = -1;
            table.records.forEach((record) => {
                s++;
                if ((table.operation == SEED_RECORD_OP_TYPE.UPDATE || table.operation == SEED_RECORD_OP_TYPE.DELETE) && !record.hasOwnProperty('id')) {
                    console.log('missing required id field for table:' + tableName + ' on record at index :' + s)
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

/**
 * @param {PrismaClient} prism 
 * @returns {Promise<object | null>} the inserted record
 * */
async function insertRecord(prism, tableName, record) {
    return prism[tableName].create({ data: { ...record } });
}
/**
 * @param {PrismaClient} prism
 * @returns {Promise<object | null>} the updated record*/
async function updateRecord(prism, tableName, record) {
    return prism[tableName].update({ data: { ...record }, where: { id: record.id } });
}
/**
 * @param {PrismaClient} prism
 * @returns {Promise<number | null>}  number of records deleted*/
async function deleteRecord(prism, tableName, record) {
    return prism[tableName].deleteMany({ where: { id: record.id } });
}


/**
 * @param {number} index 
 * @param {Logger} objLog 
 * @param {PrismaClient} prism 
 * @param {string} tableName 
 * @param {object} record 
 * @param {number} op 
 */
export async function ProcessSeedRecord(index, objLog, prism, tableName, record, op) {
    if (tableName == TABLE_NAMES.USERS && op != SEED_RECORD_OP_TYPE.DELETE) {
        record[TABLE_FIELDS_NAMES.USERS.PASSWORD] = await GeneratePassword(record[TABLE_FIELDS_NAMES.USERS.PASSWORD])
    }

    let result;
    let msg;
    if (op == SEED_RECORD_OP_TYPE.DELETE) {
        result = await deleteRecord(prism, tableName, record);
        if (!result) {
            msg = 'delete record not proceesed at index:' + index
        } else if (result > 0) {
            msg = `record deleted at index ${index}|count:${result}`;
        }
    }
    else if (op == SEED_RECORD_OP_TYPE.UPDATE) {
        result = await updateRecord(prism, tableName, record);
        if (!result || !result.id)
            msg = 'updated record not proceesed at index:' + index
        else
            msg = `record updated at index ${index}|record id:${result.id}`;
    }
    else {
        result = await insertRecord(prism, tableName, record);
        if (!result || !result.id)
            msg = 'insert record not proceesed at index:' + index
        else
            msg = `record inserted at index ${index}|record id:${result.id}`;
    }
    if (!msg) msg = `${tableName}|record not proceesed at index:${index}`;
    else msg = tableName + "|" + msg

    objLog.log(msg);

    return result;
}

export async function GeneratePassword(pwd) {
    let salt = await bcrypt.genSalt(SALR_ROUNDS);
    let encrypted = await bcrypt.hash(pwd, salt);
    return encrypted;
}
export async function ComparePassword(pwd, encryptedvalue) {
    return await bcrypt.compare(pwd, encryptedvalue);
}