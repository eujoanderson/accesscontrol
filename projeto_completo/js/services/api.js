const host = 'http://localhost:3000';

async function create(resource, data) {
  const url = `${host}/${resource}`;

  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, config);

  return await response.json();
}

async function read(resource) {
  const url = `${host}/${resource}`;

  const response = await fetch(url);

  return await response.json();
}

async function update(resource, data) {
  const url = `${host}/${resource}`;

  const config = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
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
  };

  const response = await fetch(url, config);

  return await response.json();
}

export default { create, read, update, remove };
