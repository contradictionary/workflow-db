import { ACL_TYPE, ACL_VALUE_ALL, TABLE_FIELDS_NAMES, TABLE_NAMES } from "../enums.js"

const Idx = {
    [TABLE_NAMES.USERACL]: 0,
    [TABLE_NAMES.USERROLES]: 0,
    [TABLE_NAMES.USERS]: 0,
    [TABLE_NAMES.USERACL]: 0,
}

export const seed_data_v1 = [
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
                value: `${TABLE_NAMES.LIST},${TABLE_NAMES.LISTVALUES}`
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
            {
                [TABLE_FIELDS_NAMES.USERS.ID]: 1,
                [TABLE_FIELDS_NAMES.USERS.LOGIN]: "test",
                [TABLE_FIELDS_NAMES.USERS.NAME]: "to use for testing service status",
                [TABLE_FIELDS_NAMES.USERS.EMAIL]: "test",
                [TABLE_FIELDS_NAMES.USERS.PASSWORD]: 'test',
                [TABLE_FIELDS_NAMES.USERS.USERROLEID]: 1,//BASIC
            },
        ],

    },
    // {
    //     table: TABLE_NAMES.LIST,
    //     records: [
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 1,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'servicecategories',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2,
    //         }, {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 2,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'services',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 3,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'products',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 4,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'walkins',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 5,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'members',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 6,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'billing',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 7,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'servicebilling',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 8,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'productbilling',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 9,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'membershipbilling',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 10,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'profiles',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         },
    //         {
    //             [TABLE_FIELDS_NAMES.LIST.ID]: 11,
    //             [TABLE_FIELDS_NAMES.LIST.NAME]: 'employees',
    //             [TABLE_FIELDS_NAMES.LIST.CREATEDBY]: 2
    //         }
    //     ]
    // }
]