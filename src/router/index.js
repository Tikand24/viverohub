import Vue from 'vue';
import VueRouter from 'vue-router';
import MapPlace from '../views/MapPlace/MapPlace.vue';
import Map from '../views/Maps/Map.vue';
import Statistics from '../views/Statistics/Statistics.vue';
import Calculate from '../views/Calculate/Calculate.vue';
import Masters from '../views/Masters/Masters.vue';
import Plants from '../views/Masters/Plants/Plants.vue';
import Vitrine from '../views/Vitrine/Vitrine.vue';
import Balance from '../views/Masters/Balances/Balance.vue';
import BalanceCreate from '../views/Masters/Balances/BalanceCreate.vue';
import Lists from '../views/Masters/Lists/Lists.vue';
import Routes from '../views/Masters/Routes/Routes.vue';
import Customers from '../views/Masters/Customers/Customers.vue';
import Family from '../views/Masters/Family/Family.vue';
import FamilyStatistics from '../views/Masters/Family/FamilyStatistics.vue';
import Error404 from '../views/Error404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FamilyStatistics,
  },
  {
    path: '/map-place',
    name: 'MapPlace',
    component: MapPlace,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
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
      {
        path: 'balances',
        name: 'Balances',
        component: Balance,
      },
      {
        path: 'balances/manage/:id?',
        name: 'Balances',
        component: BalanceCreate,
      },
      {
        path: 'lists',
        name: 'Lists',
        component: Lists,
      },
      {
        path: 'routes',
        name: 'Routes',
        component: Routes,
      },
      {
        path: 'customers',
        name: 'Customers',
        component: Customers,
      },
      {
        path: 'families',
        name: 'Families',
        component: Family,
      },
      {
        path: 'families-statistics',
        name: 'Families',
        component: FamilyStatistics,
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
