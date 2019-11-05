import Vue from 'vue';
import VueRouter from 'vue-router';

import paths from './paths';

const route = (path, view, name) => ({
  name: name || view,
  path,
  component: resolve => import(`../views/${view}.vue`).then(resolve),
});

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths.map(path => route(path.path, path.view, path.name)).concat([
    { path: '*', redirect: '/' },
  ]),
});

export default router;
