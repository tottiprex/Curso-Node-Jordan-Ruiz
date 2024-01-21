<script setup>
import { ref } from 'vue';
import { login } from '../services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputs = ref({
  email: '',
  password: '',
});

const isValidEmail = ref(true);

const handleLogin = async () => {
  if (
    inputs.value.email === '' ||
    inputs.value.password === '' ||
    !isValidEmail
  ) {
    alert('Todos los campos son obligatorios');
    return;
  }

  try {
    const resp = await login(inputs.value.email, inputs.value.password);

    localStorage.setItem('prex_token', resp.token);

    router.push('/usuarios');
  } catch (error) {
    alert('Creedenciales incorrectas');
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
        <h1 class="text-4xl font-bold text-center mb-4">Iniciar sesion</h1>
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

        <router-link
          class="py-2 c-blue hover:c-blue-700 transition-colors text-right font-bold"
          to="/restablecer-contrasena"
        >
          ¿Olvidaste tu contraseña?
        </router-link>

        <button
          class="py-2 px-4 rd-2 bg-green-500 c-white hover:bg-green-700 transition-colors"
          @click="handleLogin"
        >
          Ingresar
        </button>

        <router-link
          class="py-2 c-blue hover:c-blue-700 transition-colors text-right font-bold"
          to="/registrar"
        >
          Si no tienes cuenta, registrate
        </router-link>
      </div>
    </div>
  </div>
</template>
