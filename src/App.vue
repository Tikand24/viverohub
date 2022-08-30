<template>
  <v-app id="inspire">
    <title>{{ appName }}</title>
    <navigation :drawer="drawer"></navigation>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ appName }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar></snack-bar>
    </v-main>
  </v-app>
</template>

<script>
import "@/styles/overrides.sass";

import { COMPLEMENT_GET_ALL } from "@/store/complements";
import SnackBar from "./components/app/Snackbar.vue";
import Navigation from "./components/app/Navigation.vue";

export default {
  name: "App",
  components: {
    SnackBar,
    Navigation,
  },
  data: () => ({
    drawer: false,
    appName: process.env.VUE_APP_NAME || 'App name'
  }),
  methods: {
    fetchComplements: function () {
      this.$store.dispatch(COMPLEMENT_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
  },
  mounted() {
    this.fetchComplements();
  },
};
</script>
