-- CreateTable
CREATE TABLE `appsequence` (
    `sequencename` VARCHAR(191) NOT NULL,
    `sequenceval` INTEGER NOT NULL,
    `sequencestep` INTEGER NOT NULL,
    `createdon` DATETIME(3) NULL,
    `modifiedon` DATETIME(3) NULL,

    UNIQUE INDEX `appsequence_sequencename_key`(`sequencename`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userroleid` INTEGER NOT NULL,
    `createdon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `users_login_key`(`login`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_userroleid_idx`(`userroleid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `sessionid` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `createdon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usersessions_userid_sessionid_key`(`userid`, `sessionid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oldusersessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `sessionid` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `createdon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `oldusersessions_userid_idx`(`userid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userroles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdby` INTEGER NULL,
    `createdon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `userroles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `useracl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userrolesid` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `useracl_userrolesid_type_key`(`userrolesid`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdon` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedon` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listvalues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listid` INTEGER NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `value` MEDIUMTEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,

    INDEX `listvalues_key_idx`(`key`),
    INDEX `listvalues_listid_idx`(`listid`),
    UNIQUE INDEX `listvalues_listid_key_key`(`listid`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listid` INTEGER NOT NULL,
    `stringid` VARCHAR(64) NULL,
    `numberid` INTEGER NULL,
    `sdata1` VARCHAR(256) NULL,
    `sdata2` VARCHAR(256) NULL,
    `sdata3` VARCHAR(256) NULL,
    `ndata1` INTEGER NULL,
    `ndata2` INTEGER NULL,
    `ndata3` INTEGER NULL,
    `ndata4` INTEGER NULL,
    `bdata1` LONGBLOB NULL,
    `createdon` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `logs_listid_idx`(`listid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
