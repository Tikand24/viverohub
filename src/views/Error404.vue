<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          
        <v-btn rounded outlined color="primary" :to="'/'">
          Volver al inicio <v-icon right > mdi-home </v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Error404",
  data: () => ({

  }),
  methods: {},
};
</script>

<style>
</style>