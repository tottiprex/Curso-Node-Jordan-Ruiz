<script setup>
import { ref } from 'vue';
import { createUser, updateUser, getUser } from '../services/user';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const inputs = ref({
  email: '',
  password: '',

  name: '',
  age: null,
});

const id = ref(route.params.id);

if (id.value) {
  const callUser = async () => {
    try {
      const resp = await getUser(id.value);

      inputs.value = resp;
    } catch (error) {
      alert('Error al obtener el usuario');

      router.push('/usuarios');
    }
  };

  callUser();
}

const isValidEmail = ref(true);

const validFields = () => {
  if (
    inputs.value.name === '' ||
    inputs.value.age === '' ||
    inputs.value.email === '' ||
    inputs.value.password === '' ||
    !isValidEmail
  ) {
    alert('Todos los campos son obligatorios');
    return false;
  }

  return true;
};

const handleCreateUser = async () => {
  if (!validFields()) return;

  try {
    await createUser(inputs.value);

    router.push('/usuarios');
  } catch (error) {
    alert('Ocurrió un error al registrarse');
  }
};

const handleUpdateUser = async () => {
  if (!validFields()) return;

  try {
    await updateUser(inputs.value._id, inputs.value);

    router.push('/usuarios');
  } catch (error) {
    alert('Ocurrió un error al registrarse');
  }
};

const validateEmail = () => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.value.email)
  ) {
    isValidEmail.value = true;
  } else {
    isValidEmail.value = false;
  }
};
</script>

<template>
  <div class="h-screen grid place-content-center">
    <div class="flex gap-4">
      <div class="pa-4 rd-4 shadow-xl grid gap-4 w-30rem mb-8 relative">
        <router-link
          to="/usuarios"
          class="absolute left-4 top--2 cursor-pointer text-lg c-green-600/70 font-bold"
        >
          Regresar
        </router-link>

        <h1 class="text-4xl font-bold text-center mb-4">
          {{ id ? 'Editar' : 'Crear' }} usuario
        </h1>
        <div>
          <label for="email">Nombre:</label>
          <input
            class="w-full py-1 px-2 rd-2 b-1 b-gray-700 outline-none"
            type="text"
            v-model="inputs.name"
            required
          />
        </div>
        <div>
          <label for="email">Edad:</label>
          <input
            class="w-full py-1 px-2 rd-2 b-1 b-gray-700 outline-none"
            type="number"
            v-model="inputs.age"
            required
          />
        </div>
        <div>
          <label for="email">Correo:</label>
          <input
            class="w-full py-1 px-2 rd-2 b-1 b-gray-700 outline-none"
            type="email"
            v-model="inputs.email"
            required
            @blur="validateEmail"
          />
          <span v-if="!isValidEmail" class="c-red-500">Correo inválido</span>
        </div>
        <div>
          <label for="mark">Contraseña:</label>
          <input
            class="w-full py-1 px-2 rd-2 b-1 b-gray-700 outline-none"
            type="password"
            v-model="inputs.password"
            required
          />
        </div>

        <button
          v-if="!id"
          class="py-2 px-4 rd-2 bg-green-500 c-white hover:bg-green-700 transition-colors"
          @click="handleCreateUser"
        >
          Crear
        </button>
        <button
          v-else
          class="py-2 px-4 rd-2 bg-green-500 c-white hover:bg-green-700 transition-colors"
          @click="handleUpdateUser"
        >
          Editar
        </button>
      </div>
    </div>
  </div>
</template>
