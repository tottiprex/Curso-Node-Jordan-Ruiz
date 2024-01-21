<script setup>
import { ref } from 'vue';
import { passwordReset } from '../services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputs = ref({
  email: '',
});

const isValidEmail = ref(true);

const handlePasswordReset = async () => {
  if (inputs.value.email === '' || !isValidEmail) {
    alert('Todos los campos son obligatorios');
    return;
  }

  try {
    await passwordReset(inputs.value.email);

    router.push('/inicio-sesion');
  } catch (error) {
    alert('Error al restablecer contraseña');
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
        <h1 class="text-4xl font-bold text-center mb-4">
          Restablecer contraseña
        </h1>
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

        <button
          class="py-2 px-4 rd-2 bg-green-500 c-white hover:bg-green-700 transition-colors"
          @click="handlePasswordReset"
        >
          Restablecer contraseña
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
