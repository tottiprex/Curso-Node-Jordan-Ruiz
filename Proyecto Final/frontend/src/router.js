import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './pages/login.vue';
import Register from './pages/register.vue';
import LayoutUsers from './layout/users.vue';
import Users from './pages/users.vue';
import CreateUpdateUser from './pages/create-update-user.vue';
import PasswordReset from './pages/password-reset.vue';
import PasswordResetConfirm from './pages/password-reset-confirm.vue';
import { getProtected } from './services/auth';

export const isAuthenticatedGuard = async (to, from, next) => {
  try {
    const token = localStorage.getItem('prex_token');
    if (!token) {
      return next('/iniciar-sesion');
    }
    await getProtected(token);
    next();
  } catch {
    next('/iniciar-sesion');
    localStorage.removeItem('prex_token');
  }
};

export const isNotAuthenticatedGuard = async (to, from, next) => {
  try {
    const token = localStorage.getItem('prex_token');
    if (!token) {
      return next();
    }
    await getProtected(token);
    next('/usuarios');
  } catch (e) {
    next();
    localStorage.removeItem('prex_token');
  }
};

const routes = [
  {
    path: '/iniciar-sesion',
    component: Login,
    beforeEnter: isNotAuthenticatedGuard,
  },
  {
    path: '/registrar',
    component: Register,
    beforeEnter: isNotAuthenticatedGuard,
  },
  {
    path: '/restablecer-contrasena',
    component: PasswordReset,
    beforeEnter: isNotAuthenticatedGuard,
  },
  {
    path: '/restablecer-contrasena/:token',
    component: PasswordResetConfirm,
    beforeEnter: isNotAuthenticatedGuard,
  },
  {
    path: '/usuarios',
    component: LayoutUsers,
    children: [
      { path: '', component: Users },
      { path: 'crear', component: CreateUpdateUser },
      { path: 'editar/:id', component: CreateUpdateUser },
    ],
    beforeEnter: isAuthenticatedGuard,
  },
  { path: '/', redirect: '/iniciar-sesion' },
  { path: '/:pathMatch(.*)*', redirect: '/iniciar-sesion' },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
