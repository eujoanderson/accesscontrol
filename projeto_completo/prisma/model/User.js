import prisma from '../database/index.js';

async function create(user) {
    const newuser = await prisma.user.create({
        data: user,
    });

    return newuser;
}

async function readAll() {
    const users = await prisma.user.findMany();

    return users;
}

async function read(id) {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });

    return user;
}

async function update(user, id) {
    const newuser = await prisma.user.update({
        data: user,
        where: {
            id,
        },
    });

    return newuser;
}

async function remove(id) {
    await prisma.user.delete({
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