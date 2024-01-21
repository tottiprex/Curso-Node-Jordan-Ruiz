<script setup>
import { ref } from 'vue';
import { getUsers, deleteUser } from '../services/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const userlist = ref([]);

const callUsers = async () => {
  try {
    const resp = await getUsers();

    userlist.value = resp;
  } catch (error) {
    alert('Error al obtener los usuarios');
  }
};

callUsers();

const handleDelete = async (id) => {
  const isPass = confirm('¿Estas seguro de eliminar el usuario?');

  if (!isPass) return;

  try {
    await deleteUser(id);

    callUsers();
  } catch (error) {
    alert('Error al eliminar el usuario');
  }
};

const logout = () => {
  localStorage.removeItem('prex_token');

  router.push('/iniciar-sesion');
};
</script>

<template>
  <div class="h-screen grid place-content-center py-12rem">
    <div class="flex gap-4">
      <div class="pa-4 rd-4 shadow-xl grid gap-4 w-60rem mb-8 relative">
        <p
          @click="logout"
          class="absolute right-4 top--2 cursor-pointer c-blue font-bold"
        >
          Cerrar sesion
        </p>

        <div class="text-center flex justify-between items-center">
          <router-link
            to="/usuarios/crear"
            class="px-2 py-1 bg-green-600/80 c-white rd-1 mr-2"
          >
            Agregar usuarios
          </router-link>
          <h1 class="text-4xl font-bold text-center mb-4">Usuarios</h1>
        </div>

        <table class="table-auto" aria-describedby="">
          <thead>
            <tr>
              <th class="px-4 py-2">Nombre</th>
              <th class="px-4 py-2">Edad</th>
              <th class="px-4 py-2">Correo</th>
              <th class="px-4 py-2 w-12rem">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="user in userlist">
              <tr class="even:bg-gray-100">
                <td class="border px-4 py-2">{{ user.name }}</td>
                <td class="border px-4 py-2">{{ user.age }}</td>
                <td class="border px-4 py-2">{{ user.email }}</td>
                <td class="border px-4 py-2">
                  <router-link
                    :to="`/usuarios/editar/${user._id}`"
                    class="px-2 py-1 bg-cyan-600/80 c-white rd-1 mr-2"
                  >
                    Editar
                  </router-link>
                  <button
                    @click="handleDelete(user._id)"
                    class="px-2 py-1 bg-red-600/80 c-white rd-1"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
