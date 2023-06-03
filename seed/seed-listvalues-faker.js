import { prismaClient } from '../db-client.js';
import { PrepareSeedData, ProcessSeedRecord } from './seed-common.js';
import { SEED_RECORD_OP_TYPE, TABLE_FIELDS_NAMES, TABLE_NAMES } from '../enums.js';
import { Logger } from '../../../common/logs.js';
import { faker } from '@faker-js/faker';

const jobTitles = ['Beutician', 'Hair', 'Mani-Padi', 'Helper',]
const senioritylevels = ['Junior', 'Senior']

let objLog = new Logger();
objLog.init('seed-listvalues-faker');
let indexJobTitle = RandomNumberRange(0, jobTitles.length - 1)
let indexSeniorLvl = RandomNumberRange(0, senioritylevels.length - 1)
const getJobTitle = () => jobTitles[indexJobTitle()]
const getSeniorLvl = () => senioritylevels[indexSeniorLvl()]
const mobileFistDigit = RandomNumberRange(6, 9);
const faker_data = [];
const listName = "fake-employees";

function GenerateFakeData(listid, createdBy) {
    const employees = { table: TABLE_NAMES.LISTVALUES, records: [] };
    for (let i = 0; i < 20; i++) {
        let s = getSeniorLvl();
        let t = s ? s + " " + getJobTitle() : getJobTitle();
        const employe = {
            name: faker.person.fullName(),
            sex: faker.person.sex(),
            gender: faker.person.gender(),
            email: faker.internet.email(),
            dob: faker.date.between({ from: '1975-01-01T00:00:00.000Z', to: '2005-01-01T00:00:00.000Z' }), // '2026-05-16T02:22:53.002Z'
            profile: t,
            mobile: faker.phone.number(mobileFistDigit() + '#########')
        }
        employees.records.push({
            [TABLE_NAMES.LIST]: {
                connect: { [TABLE_FIELDS_NAMES.LIST.ID]: listid },
            },
            'User': {
                connect: { [TABLE_FIELDS_NAMES.USERS.ID]: createdBy },
            },
            [TABLE_FIELDS_NAMES.LISTVALUES.KEY]: employe.mobile,
            [TABLE_FIELDS_NAMES.LISTVALUES.VALUE]: JSON.stringify(employe),
        })
    }
    // console.log(employees);
    return employees;
};

async function main(data) {
    const to_be_processed = PrepareSeedData(data);
    for (let i = 0; i < to_be_processed.length; i++) {
        const table = to_be_processed[i];
        for (let j = 0; j < table.records.length; j++) {
            const record = table.records[j];
            let result = await ProcessSeedRecord(j, objLog, prismaClient, table.table, record, table.operation || SEED_RECORD_OP_TYPE.INSERT);
        }
    }
}
function MainRun(d) {
    main(d).then(result => console.log(result)).catch(err => { throw err }).finally(() => {
        prismaClient.$disconnect();
        objLog.close();
    })
}

function RandomNumberRange(min, max) {
    return function () {
        return (Math.random() * (max - min) + min).toFixed(0);
    }
}

(async () => {
    let system_user = await prismaClient.users.findFirst({ where: { login: 'system' } });
    if (!system_user) {
        close();
        return;
    }

    let list_record = {
        [TABLE_FIELDS_NAMES.LIST.NAME]: listName, 'createdbyUser': {
            connect: { [TABLE_FIELDS_NAMES.USERS.ID]: system_user.id },
        },
    }

    let new_record = await ProcessSeedRecord(0, objLog, prismaClient, TABLE_NAMES.LIST, list_record, SEED_RECORD_OP_TYPE.INSERT);
    if (!new_record || !new_record.id) {
        close();
        return;
    }

    let fake_employees = GenerateFakeData(new_record.id, system_user.id);
    let exisiting_fake_employees = await prismaClient.listvalues.findMany({ where: { list: { name: listName } } });
    await prismaClient.listvalues.deleteMany({ where: { list: { name: listName } } });
    MainRun([fake_employees])
})();

function close() {
    objLog.close();
}