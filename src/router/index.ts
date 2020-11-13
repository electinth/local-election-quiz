import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import(/* webpackChunkName: "quiz" */ '../views/quiz.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
