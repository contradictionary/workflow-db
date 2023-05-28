import { ACL_TYPE, ACL_VALUE_ALL, TABLE_FIELDS_NAMES, TABLE_NAMES, seeed_data_type } from "./enums"

const Idx = {
    [TABLE_NAMES.USERACL]: 0,
    [TABLE_NAMES.USERROLES]: 0,
    [TABLE_NAMES.USERS]: 0,
    [TABLE_NAMES.USERACL]: 0,
}

export const seed_data_v1: seeed_data_type = [
    {
        "table": TABLE_NAMES.USERROLES,
        "records": [
            {
                id: ++Idx[TABLE_NAMES.USERROLES],
                name: 'basic user',
                description: 'basic user which can login and read some tables',
            },
            {
                id: ++Idx[TABLE_NAMES.USERROLES],
                name: 'admin user',
                description: 'admin user which can login and read write on all tables',
            }
        ]
    },
    {
        "table": TABLE_NAMES.USERACL,
        // option  in case of insert, required other wise "operation":SEED_RECORD_OP_TYPE.UPDATE,
        "records": [
            {
                id: ++Idx[TABLE_NAMES.USERACL],
                userrolesid: 1,//basic
                type: ACL_TYPE.READ,
                value: ACL_VALUE_ALL
            },
            {
                id: ++Idx[TABLE_NAMES.USERACL],
                userrolesid: 2,//admin
                type: ACL_TYPE.READ,
                value: ACL_VALUE_ALL
            },
            {
                id: ++Idx[TABLE_NAMES.USERACL],
                userrolesid: 2,//admin
                type: ACL_TYPE.WRITE,
                value: ACL_VALUE_ALL
            }
        ]
    },
    {
        "table": TABLE_NAMES.USERS,
        "records": [
            {
                [TABLE_FIELDS_NAMES.USERS.ID]: 1,
                [TABLE_FIELDS_NAMES.USERS.LOGIN]: "basic1",
                [TABLE_FIELDS_NAMES.USERS.NAME]: "Basic User",
                [TABLE_FIELDS_NAMES.USERS.EMAIL]: "rvsingh42@gmail.com",
                [TABLE_FIELDS_NAMES.USERS.PASSWORD]: 'basic1',
                [TABLE_FIELDS_NAMES.USERS.USERROLEID]: 1,//BASIC
            },
            {
                [TABLE_FIELDS_NAMES.USERS.ID]: 2,
                [TABLE_FIELDS_NAMES.USERS.LOGIN]: "system",
                [TABLE_FIELDS_NAMES.USERS.NAME]: "system",
                [TABLE_FIELDS_NAMES.USERS.EMAIL]: "system",
                [TABLE_FIELDS_NAMES.USERS.PASSWORD]: 'Passw@rd1',
                [TABLE_FIELDS_NAMES.USERS.USERROLEID]: 2,//BASIC
            },
        ],

    },
]