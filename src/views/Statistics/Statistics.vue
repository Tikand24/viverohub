<template>
  <v-container>
    <v-row>
      <v-col
        v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
        :key="i"
        cols="12"
        md="4"
        lg="3"
      >
        <material-stat-card v-bind="attrs">
          <template #actions>
            <v-icon class="mr-2" small v-text="actionIcon" />
            <div class="text-truncate">
              {{ actionText }}
            </div>
          </template>
        </material-stat-card>
      </v-col>
      <v-col cols="12" md="12" lg="12">
        <Sales />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sales from "../../components/Charts/Sales.vue";
import MaterialStatCard from "../../components/app/MaterialStatsCard.vue";
export default {
  name: "Statistics",
  components: {
    Sales,
    MaterialStatCard,
  },
  data: () => ({
    stats: [
      {
        color: "red",
        icon: "mdi-arrow-down",
        title: "Salidas",
        value: "$26,965,600",
      },
      {
        color: "green",
        icon: "mdi-arrow-up",
        title: "Retornos",
        value: "$5,301,600",
      },
    ],
  }),
};
</script>

<style>
</style>