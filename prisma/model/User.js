import prisma from '../database/index.js';

import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT);


async function create(user) {

    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;

    const newuser = await prisma.user.create({
        data: user,
    });

    return newuser;
}

async function createPerson(person) {
    const newperson = await prisma.persons.create({
        data: person,
    });

    return newperson;
}

async function readByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  
    return user;
}

async function readAll() {
    const users = await prisma.user.findMany();

    return users;
}

async function readEmail() {
    const users = await prisma.user.findMany({
        select: {
            email: true,
          },
    });

    return users;
}

async function readPersons() {
    const persons = await prisma.persons.findMany();

    return persons;
}

async function readUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
          },
    });

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

    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;

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
    readByEmail,
    readEmail,
    readUsers,
    readPersons,
    createPerson
};