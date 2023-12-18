import Auth from '../lib/auth.js';

const host = '/api';

async function create(resource, data, auth = true) {
  const url = `${host}/${resource}`;

  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  if (auth) {
    config.headers.Authorization = `Bearer ${Auth.getToken()}`;
  }

  const response = await fetch(url, config);

  return await response.json();
}

async function read(resource) {
  const url = `${host}/${resource}`;

  const config = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };

  const response = await fetch(url, config);

  return await response.json();
}

async function update(resource, data) {
  const url = `${host}/${resource}`;

  const config = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, config);

  return await response.json();
}

async function remove(resource) {
  const url = `${host}/${resource}`;

  const config = {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };

  const response = await fetch(url, config);

  return await response.json();
}

export default { create, read, update, remove };