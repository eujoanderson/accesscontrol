import prisma from '../database/index.js';

async function create(reachability) {
    const newReachability = await prisma.reachability.create({
        data: reachability,
    });

    return newReachability;
}

async function readAll() {
    const reachabilities = await prisma.reachability.findMany();

    return reachabilities;
}

async function read(id) {
    const reachability = await prisma.reachability.findFirst({
        where: {
            id,
        },
    });

    return reachability;
}

async function readByHost(hostId) {
    const reachability = await prisma.reachability.findMany({
        where: {
            hostId,
        },
    });

    return reachability;
}

export default {
    create,
    readAll,
    read,
    readByHost,
};