export const ACL_TYPE = {
    READ: 1,
    WRITE: 2,
    INSERT: 3,
    DELETE: 4
}
export const ACL_VALUE_ALL = "-999"
export const TABLE_NAMES = {
    APPSEQUENCE: 'appsequence',
    USERS: 'users',
    USERSESSIONS: 'usersessions',
    OLDUSERSESSIONS: 'oldusersessions',
    USERROLES: 'userroles',
    USERACL: 'useracl',
    LISTS: 'lists',
    LISTVALUES: 'listvalues',
    LOGS: 'logs'
}
export const TABLE_FIELDS_NAMES = {
    [TABLE_NAMES.APPSEQUENCE]: {
        SEQUENCENAME: 'sequencename',
        SEQUENCEVAL: 'sequenceval',
        SEQUENCESTEP: 'sequencestep',
        CREATEDON: 'createdon',
        MODIFIEDON: 'modifiedon',
    },
    [TABLE_NAMES.USERS]: {
        ID: 'id',
        LOGIN: 'login',
        EMAIL: 'email',
        NAME: 'name',
        PASSWORD: 'password',
        USERROLEID: 'userroleid',
        CREATEDON: 'createdon',
        MODIFIEDON: 'modifiedon',
        STATUS: 'status',
    },
    [TABLE_NAMES.USERSESSIONS]: {
        ID: "id",
        USERID: "userid",
        SESSIONID: "sessionid",
        DEVICE: "device",
        CREATEDON: "createdon",
        STATUS: "status",
    },
    [TABLE_NAMES.OLDUSERSESSIONS]: {
        ID: "id",
        USERID: "userid",
        SESSIONID: "sessionid",
        DEVICE: "device",
        CREATEDON: "createdon",
        STATUS: "status",

        USER: 'user',
    },
    [TABLE_NAMES.USERROLES]: {
        ID: 'id',
        NAME: 'name',
        DESCRIPTION: 'description',
        CREATEDBY: 'createdby',
        CREATEDON: 'createdon',
        MODIFIEDON: 'modifiedon',
    },
    [TABLE_NAMES.USERACL]: {
        ID: 'id',
        USERROLESID: 'userrolesid',
        TYPE: 'type',
        VALUE: 'value',
    },
    [TABLE_NAMES.LISTS]: {
        ID: "id",
        NAME: "name",
        DESCRIPTION: "description",
        CREATEDON: "createdon",
        MODIFIEDON: "modifiedon",
    },
    [TABLE_NAMES.LISTVALUES]: {
        ID: "id",
        LISTID: "listid",
        KEY: "key",
        VALUE: "value",
        STATUS: "status"
    },
}
export const RELATED_FIELD_NAMES = {
    [TABLE_NAMES.USERS]: {
        USERROLE: 'userrole',
        USERSESSIONS: 'usersessions',
        OLDUSERSESSIONS: 'oldusersessions',
    },
    [TABLE_NAMES.USERSESSIONS]: {
        OLDUSERSESSIONS: 'oldusersessions',
    },
    [TABLE_NAMES.OLDUSERSESSIONS]: {
        OLDUSERSESSIONS: 'oldusersessions',
    },
    [TABLE_NAMES.USERROLES]: {
        USERACLS: 'useracls',
        USERS: 'users',
    },
    [TABLE_NAMES.USERACL]: {
        USERROLE: 'userrole',
    },
    [TABLE_NAMES.LISTS]: {
        LISTVALUES: 'listvalues',
        LOGS: 'logs',
    },
    [TABLE_NAMES.LISTVALUES]: {
        LIST: 'list',
    },
    [TABLE_NAMES.LOGS]: {
        LIST: 'list',
    },
}