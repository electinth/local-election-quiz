import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router';

import Home from '../views/home.vue';
import { ProviderName } from '@/constants/provider';

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
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/register.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () =>
      import(/* webpackChunkName: "result" */ '../views/result.vue')
  }
];

const redirectToHomeIfUserIdIsNotGenerated = (
  { name }: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (
    name !== 'Home' &&
    name !== 'Quiz' &&
    !sessionStorage.getItem(ProviderName.UserId)
  ) {
    next({ name: 'Home', replace: true });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(redirectToHomeIfUserIdIsNotGenerated);

export default router;
