export const ACL_TYPE = {
    READ: 1,
    WRITE: 2,
    INSERT: 3,
    DELETE: 4
}
export const SALR_ROUNDS = 10;
export const ACL_VALUE_ALL = "-999"
export const SEED_RECORD_OP_TYPE = {
    INSERT: 1,
    UPDATE: 2,
    DELETE: 3
}
export const BASIC_ROLE_NAME = 'basic user';
export const ADMIN_ROLE_NAME = 'admin user';
export const SESSION_STATUS = {
    ACTIVE: 0,
    DEACTIVE: 1
}
export const TABLE_NAMES = {
    USERS: 'users',
    USERSESSIONS: 'usersessions',
    USERROLES: 'userroles',
    USERACL: 'useracl',
    LIST: 'list',
    LISTVALUES: 'listvalues',
}
export const TABLE_FIELDS_NAMES = {
    USERS: {
        ID: "id",
        LOGIN: "login",
        EMAIL: "email",
        NAME: "name",
        PASSWORD: "password",
        USERROLEID: "userroleid",
        CREATEDON: "createdon",
        MODIFIEDON: "modifiedon",
        STATUS: "status",
    },
    USERSESSIONS: {
        ID: "id",
        USERID: "userid",
        SESSIONID: "sessionid",
        DEVICE: "device",
        CREATEDON: "createdon",
        MODIFIEDON: "modifiedon",
        STATUS: "status",
    },
    USERROLES: {
        ID: "id",
        NAME: "name",
        DESCRIPTION: "description",
        CREATEDBY: "createdby",
        CREATEDON: "createdon",
        MODIFIEDON: "modifiedon",
    },
    USERACL: {
        ID: "id",
        USERROLESID: "userrolesid",
        TYPE: "type",
        VALUE: "value"
    },
    LIST: {
        ID: "id",
        NAME: "name",
        CREATEDBY: "createdby",
        CREATEDON: "createdon",
        MODIFIEDON: "modifiedon",
        LISTVALUES: "listvalues",
    },
    LISTVALUES: {
        ID: "id",
        LISTID: "listid",
        KEY: "key",
        VALUE: "value",
        CREATEDBY: "createdby",
        STATUS: "status"
    },
}
export const CHILD_TABLE_FIELDS_INCLUDE = {
    //parent table : {
    //child table : /*field names*/
    //}
    [TABLE_NAMES.LIST]: {
        [TABLE_NAMES.USERS]: {
            fields: [TABLE_FIELDS_NAMES.USERS.NAME],
            'name': 'createdbyUser'
        },
    },
    [TABLE_NAMES.LISTVALUES]: {
        [TABLE_NAMES.LIST]: {
            fields: [TABLE_FIELDS_NAMES.LIST.NAME, TABLE_FIELDS_NAMES.LIST.CREATEDON,
            TABLE_FIELDS_NAMES.LIST.CREATEDBY],
            'name': 'list'
        },
        [TABLE_NAMES.USERS]: {
            fields: [TABLE_FIELDS_NAMES.USERS.NAME],
            'name': 'User'
        },
    }
}