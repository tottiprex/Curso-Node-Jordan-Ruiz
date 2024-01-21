export const getUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Error fetching users');
  }

  const data = await response.json();

  return data;
};

export const getUser = async (id) => {

  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Error fetching user');
  }


  const data = await response.json();

  return data;
}

export const createUser = async (user) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(user),
  });

  if (response.status !== 201) {
    throw new Error('Error creating user');
  }

  const data = await response.json();

  return data;
}

export const updateUser = async (id, user) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: 'PUT',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(user),
  });

  if (response.status !== 200) {
    throw new Error('Error updating user');
  }

  const data = await response.json();

  return data;
}

export const deleteUser = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: 'DELETE',

    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Error deleting user');
  }

  const data = await response.json();

  return data;
};
