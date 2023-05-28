-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "userroleid" INTEGER NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Users_userroleid_fkey" FOREIGN KEY ("userroleid") REFERENCES "UserRoles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserSessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER NOT NULL,
    "sessionid" TEXT NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "UserSessions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserAclType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserAcl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userRolesId" INTEGER NOT NULL,
    "acltype" INTEGER NOT NULL,
    "aclvalue" TEXT NOT NULL,
    CONSTRAINT "UserAcl_userRolesId_fkey" FOREIGN KEY ("userRolesId") REFERENCES "UserRoles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserAcl_acltype_fkey" FOREIGN KEY ("acltype") REFERENCES "UserAclType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "List_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ListValues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listid" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ListValues_listid_fkey" FOREIGN KEY ("listid") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListValues_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSessions_userid_sessionid_key" ON "UserSessions"("userid", "sessionid");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_name_key" ON "UserRoles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserAclType_name_key" ON "UserAclType"("name");

-- CreateIndex
CREATE INDEX "ListValues_key_idx" ON "ListValues"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ListValues_listid_key_key" ON "ListValues"("listid", "key");
