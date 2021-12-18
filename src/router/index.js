import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MapPlace from '../views/MapPlace/MapPlace.vue';
import Statistics from '../views/Statistics/Statistics.vue';
import Calculate from '../views/Calculate/Calculate.vue';
import Masters from '../views/Masters/Masters.vue';
import Plants from '../views/Masters/Plants/Plants.vue';
import Vitrine from '../views/Vitrine/Vitrine.vue';
import Error404 from '../views/Error404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/map-place',
    name: 'MapPlace',
    component: MapPlace,
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
  },
  {
    path: '/calculate',
    name: 'Calculate',
    component: Calculate,
  },
  {
    path: '/vitrine',
    name: 'Vitrine',
    component: Vitrine,
  },
  {
    path: '/masters/',
    name: 'Masters',
    component: Masters,
    children: [
      {
        path: 'plants',
        name: 'Plants',
        component: Plants,
      },
    ],
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
