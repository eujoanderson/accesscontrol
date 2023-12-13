import prisma from '../database/index.js';

async function create(host) {
    const newHost = await prisma.host.create({
        data: host,
    });

    return newHost;
}

async function readAll() {
    const hosts = await prisma.host.findMany();

    return hosts;
}

async function read(id) {
    const host = await prisma.host.findFirst({
        where: {
            id,
        },
    });

    return host;
}

async function update(host, id) {
    const newHost = await prisma.host.update({
        data: host,
        where: {
            id,
        },
    });

    return newHost;
}

async function remove(id) {
    await prisma.host.delete({
        where: {
            id,
        },
    });
}

export default {
    create,
    readAll,
    read,
    update,
    remove,
};