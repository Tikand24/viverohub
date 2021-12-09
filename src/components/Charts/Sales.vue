<template>
  <div>
    <v-card class="mx-auto text-center" color="grey lighten-5">
      <v-card-text>
          <bar-chart :data="chartdata" :options="options"></bar-chart>
      </v-card-text>

      <v-card-text>
        <div class="text-h4 font-weight-thin">Sales Last 24h</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn block text> Go to Report </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import BarChart from "../../core/Charts/Bar.js";
export default {
  name: "Sales",
  components: {
    BarChart,
  },
  data: () => ({
    chartdata: {
      labels: ["Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"],
      datasets: [
        {
          label: "Salidas",
          data: [11000000, 10000000, 6000000, 3000000, 0],
          backgroundColor: "#D32F2F",
          borderColor: "#B71C1C",
          borderWidth: 3,
        },
        {
          label: "Entradas",
          data: [0, 700000, 1300000, 3500000, 0],
          backgroundColor: "#388E3C",
          borderColor: "#1B5E20",
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
};
</script>

<style>
</style>