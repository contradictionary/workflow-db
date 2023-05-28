-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userroleid" INTEGER NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "users_userroleid_fkey" FOREIGN KEY ("userroleid") REFERENCES "userroles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usersessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER NOT NULL,
    "sessionid" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "usersessions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "userroles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdby" INTEGER,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "userroles_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "useracl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userrolesid" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "useracl_userrolesid_fkey" FOREIGN KEY ("userrolesid") REFERENCES "userroles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedon" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "list_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "listvalues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listid" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "listvalues_listid_fkey" FOREIGN KEY ("listid") REFERENCES "list" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "listvalues_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usersessions_userid_sessionid_key" ON "usersessions"("userid", "sessionid");

-- CreateIndex
CREATE UNIQUE INDEX "userroles_name_key" ON "userroles"("name");

-- CreateIndex
CREATE INDEX "listvalues_key_idx" ON "listvalues"("key");

-- CreateIndex
CREATE UNIQUE INDEX "listvalues_listid_key_key" ON "listvalues"("listid", "key");
