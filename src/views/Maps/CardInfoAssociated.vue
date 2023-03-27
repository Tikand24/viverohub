<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-html="familyData.family.name"></v-list-item-title>
        <v-list-item-subtitle
          v-html="
            `Finca: ${familyData.family.finca} </br> Telefono: ${familyData.family.headFamilyPhone}`
          "
        ></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "CardInfoAssociated",
  props: {
    familyData: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {},
};
</script>
