import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Example from '@/views/example/Example.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Example,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
