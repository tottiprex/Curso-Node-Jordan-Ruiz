export const login = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.status !== 200) {
    throw new Error('Email o contraseña incorrectos');
  }

  const data = await response.json();

  return data;
};

export const register = async (user) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(user),
  });

  if (response.status !== 201) {
    throw new Error('Error al registrar el usuario');
  }
};

export const getProtected = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/protected`, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Error fetching protected');
  }
};

export const passwordReset = async (email) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/password-reset`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email }),
    }
  );

  if (response.status !== 200) {
    throw new Error('Error al enviar el correo');
  }
};

export const passwordResetConfirm = async (token, password) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/password-reset/${token}`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ password }),
    }
  );

  if (response.status !== 200) {
    throw new Error('Error al enviar el correo');
  }
};
