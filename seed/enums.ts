export enum ACL_TYPE {
    READ = 1,
    WRITE,
    INSERT,
    DELETE
}
export const SALR_ROUNDS = 10;
export const ACL_VALUE_ALL = "-999"
export enum SEED_RECORD_OP_TYPE {
    INSERT = 1,
    UPDATE,
    DELETE
}
export enum TABLE_NAMES {
    USERS = 'users',
    USERSESSIONS = 'usersessions',
    USERROLES = 'userroles',
    USERACL = 'useracl',
    LIST = 'list',
    LISTVALUES = 'listvalues',
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
export interface SeedRecord {
    table: TABLE_NAMES
    operation?: SEED_RECORD_OP_TYPE
    records: Array<Record<string, any>>
}
export type seeed_data_type = Array<SeedRecord>