import { PrismaClient } from '@prisma/client';
import SeedData from './seed-data';//todo: parameterise this, decide which file to use
const prisma = new PrismaClient({ log: ['query'] });

async function main() {


    

}

main().then(result => console.log(result)).catch(err => { throw err }).finally(() => {
    prisma.$disconnect();
})