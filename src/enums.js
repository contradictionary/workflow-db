export const ACL_TYPE = {
    READ: 1,
    WRITE: 2,
    INSERT: 3,
    DELETE: 4
}
export const ACL_VALUE_ALL = "-999"
export const SEED_RECORD_OP_TYPE = {
    INSERT: 1,
    UPDATE: 2,
    DELETE: 3
}
export const SESSION_STATUS = {
    ACTIVE: 0,
    INACTIVE: 1
}
export const TABLE_NAMES = {
    APPSEQUENCE: 'appsequence',
    USERS: 'users',
    USERSESSIONS: 'usersessions',
    OLDSESSIONS: 'oldsessions',
    USERROLES: 'userroles',
    USERACL: 'useracl',
    LIST: 'list',
    LISTVALUES: 'listvalues',
    LOGS: 'logs'
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
        ID: 'id',
        NAME: 'name',
        CREATEDBY: 'createdby',
        CREATEDON: 'createdon',
        MODIFIEDON: 'modifiedon',
        LISTVALUES: "listvalues",
        LOGS: "logs"
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