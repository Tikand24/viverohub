<template>
  <div>
      <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ appName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            System BETA v1.0.0 
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({
    appName: process.env.VUE_APP_NAME || 'App name',
      items: [
          { title: 'Inicio', icon: 'mdi-view-dashboard',route:'/' },
          { title: 'Familias', icon: 'mdi-home',route:'/masters/families' },
          { title: 'Mapa', icon: 'mdi-map',route:'/map' },
          { title: 'Datos maestros', icon: 'mdi-database-search',route:'/master-data' },
          { title: 'Estadisticas', icon: 'mdi-chart-bar',route:'/statistics' },
          
        ],
  }),
  props:['drawer'],
  methods: {
  },
};
</script>

<style>

</style>