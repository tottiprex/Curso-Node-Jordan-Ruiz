<script setup>
import { ref } from 'vue';
import { register } from '../services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputs = ref({
  email: '',
  password: '',

  name: '',
  age: null,
});

const isValidEmail = ref(true);

const handleRegister = async () => {
  if (
    inputs.value.name === '' ||
    inputs.value.age === '' ||
    inputs.value.email === '' ||
    inputs.value.password === '' ||
    !isValidEmail
  ) {
    alert('Todos los campos son obligatorios');
    return;
  }

  try {
    await register(inputs.value);

    router.push('/inicio-sesion');
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
      <div class="pa-4 rd-4 shadow-xl grid gap-4 w-30rem mb-8">
        <h1 class="text-4xl font-bold text-center mb-4">Registro</h1>
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
          class="py-2 px-4 rd-2 bg-green-500 c-white hover:bg-green-700 transition-colors"
          @click="handleRegister"
        >
          Registrarse
        </button>

        <router-link
          class="py-2 c-blue hover:c-blue-700 transition-colors text-right font-bold"
          to="/inicio-sesion"
        >
          Si ya tienes cuenta, inicia sesión
        </router-link>
      </div>
    </div>
  </div>
</template>
