<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="5">
        <material-chart-generic-card color="white" :title="'Nivel sisben'">
          <template #heading>
            <pie :data="chartData" :options="chartOptions" />
          </template>

          <template #subtitle>
            <div class="font-weight-light text--secondary">
              <div v-html="'Distrubucion por nivel social de los asociados'" />
            </div>
          </template>

          <template #actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>

            <span
              class="text-caption grey--text font-weight-light"
              v-text="'Encuesta del año 2022'"
            />
          </template>
        </material-chart-generic-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialChartGenericCard from "../../components/app/MaterialChartGenericCard.vue";
import { FAMILY_GET_ALL } from "@/store/masters";
import Pie from "@/core/Charts/Pie.js";

export default {
  name: "Statistics",
  components: {
    MaterialChartGenericCard,
    Pie,
  },
  data: () => ({
    chartData: {
      labels: [
        "A1 - A5: Pobreza extrema",
        "B1 - B7: Pobreza moderada",
        "C1 - C18: Vulnerable",
        "D1 - D21: No pobre, No vulnerable",
      ],
      datasets: [
        {
          backgroundColor: ["#FF9800", "#FFCC80", "#FFE0B2", "#FFF3E0"],
          data: [40, 20, 80, 10],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    fetchAllFamilies: function() {
      this.$store.dispatch(FAMILY_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
  },
  mounted() {
    this.setNumeroSocios();
    this.fetchAllFamilies();
  },
};
</script>

<style></style>
