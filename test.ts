import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query'] });
async function main() {
    let userroles = await prisma.userroles.count();
    console.log(`user role count ${userroles}`);

    let useracl = await prisma.useracl.count();
    console.log(`user acl count ${useracl}`);

    let users = await prisma.users.count();
    console.log(`user count ${users}`);

}


main().then(result => console.log(result)).catch(err => { throw err }).finally(() => {
    prisma.$disconnect();
})