<script setup>
import { ref } from 'vue';
import { passwordResetConfirm } from '../services/auth';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const token = ref(route.params.token);

if (!token.value) {
  router.push('/inicio-sesion');
}

const inputs = ref({
  password: '',
});

const isValidEmail = ref(true);

const handlePasswordReset = async () => {
  if (inputs.value.password === '') {
    alert('Todos los campos son obligatorios');
    return;
  }

  try {
    await passwordResetConfirm(token.value, inputs.value.password);

    router.push('/inicio-sesion');
  } catch (error) {
    alert('Error al restablecer contraseña');
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
          <label for="email">Contraseña:</label>
          <input
            class="w-full py-1 px-2 rd-2 b-1 b-gray-700 outline-none"
            type="password"
            v-model="inputs.password"
            required
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
