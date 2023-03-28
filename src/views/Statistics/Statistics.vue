<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        v-for="(chart, i) in charts"
        :key="`${chart.name}${i}`"
        :md="chart.col.md"
        :lg="chart.col.lg"
      >
        <material-chart-generic-card color="white" :title="chart.title">
          <template #heading>
            <template v-if="chart.type == 'Pie'">
              <pie :data="chart.chartData" :options="chart.chartOptions" />
            </template>
            <template v-if="chart.type == 'Doughnut'">
              <doughnut :data="chart.chartData" :options="chart.chartOptions" />
            </template>
            <template v-if="chart.type == 'HorizontalBar'">
              <horizontal-bar
                :data="chart.chartData"
                :options="chart.chartOptions"
                :height="chart.height ? chart.height : '200px'"
              />
            </template>
            <template v-if="chart.type == 'Bar'">
              <bar :data="chart.chartData" :options="chart.chartOptions" />
            </template>
          </template>

          <template #subtitle>
            <div class="font-weight-light text--secondary">
              <div v-html="chart.subtitle" />
            </div>
          </template>

          <template #actions v-if="chart.footer">
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span
              class="text-caption grey--text font-weight-light"
              v-text="chart.footer"
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
import Doughnut from "@/core/Charts/Doughnut.js";
import HorizontalBar from "@/core/Charts/HorizontalBar.js";
import Bar from "@/core/Charts/Bar.js";

export default {
  name: "Statistics",
  components: {
    MaterialChartGenericCard,
    Pie,
    Doughnut,
    HorizontalBar,
    Bar,
  },
  data: () => ({
    charts: [
      {
        type: "Pie",
        name: "sisben",
        title: "Nivel del sisben",
        subtitle: "Distrubucion por nivel social de los asociados",
        footer: "Encuesta del año 2022",
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
        col: {
          md: 5,
          lg: 6,
        },
      },
      {
        type: "Doughnut",
        name: "GrupoEtnico",
        title: "Grupo etnico",
        subtitle: "Grupo etnico de los asociados ",
        footer: "Encuesta del año 2022",
        chartData: {
          labels: [
            "Discapacitados",
            "Mujer rural",
            "Campesino",
            "Joven Rural",
            "Adulto mayor",
            "Desplazado",
            "Madre cabeza familia",
          ],
          datasets: [
            {
              backgroundColor: [
                "#EDE7F6",
                "#D1C4E9",
                "#B39DDB",
                "#9575CD",
                "#7E57C2",
                "#5E35B1",
                "#311B92",
              ],
              data: [40, 20, 80, 10, 20, 80, 10],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
        col: {
          md: 5,
          lg: 6,
        },
      },
      {
        type: "HorizontalBar",
        name: "TenenciaTierra",
        title: "Tierra",
        subtitle: "Tipo de tenencia de tierra ",
        footer: "Encuesta del año 2022",
        chartData: {
          labels: ["Propietario", "Poseedor", "Ocupante", "Arrendatario"],
          datasets: [
            {
              barThickness: 13,
              axis: "y",
              label: "Tenencia tierra",
              backgroundColor: "#009688",
              data: [40, 20, 12, 39],
            },
          ],
        },
        chartOptions: {
          scales: {
            xAxes: [
              {
                stacked: false,
              },
            ],
            yAxes: [
              {
                stacked: false,
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
        },
        col: {
          md: 4,
          lg: 5,
        },
      },
      {
        type: "Bar",
        name: "GrupoEtnicoAsocia",
        title: "Grupo etnico por asociaciones",
        subtitle:
          "Grupo etnico de los asociados de los diferentes asociaciones ",
        footer: "Encuesta del año 2022",
        chartData: {
          labels: [
            "Discapacitados",
            "Mujer rural",
            "Campesino",
            "Joven Rural",
            "Adulto mayor",
            "Desplazado",
            "Madre cabeza familia",
          ],
          datasets: [
            {
              label: "CFP",
              backgroundColor: "#1976D2",
              data: [60, 100, 67, 80, 15, 12, 26],
              barThickness: 13,
              order: 1,
            },
            {
              label: "AUMUR",
              backgroundColor: "#E3F2FD",
              data: [2, 70, 51, 93, 100, 55, 73],
              barThickness: 13,
              order: 4,
            },
            {
              label: "ASOMUNEA",
              backgroundColor: "#90CAF9",
              data: [58, 55, 7, 8, 44, 26, 39],
              barThickness: 13,
              order: 3,
            },
            {
              label: "ASOTRASIL",
              backgroundColor: "#42A5F5",
              data: [5, 67, 3, 87, 25, 92, 93],
              barThickness: 13,
              order: 2,
            },
          ],
        },
        chartOptions: {
          scales: {
            xAxes: [
              {
                stacked: false,
              },
            ],
            yAxes: [
              {
                stacked: false,
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
        },
        col: {
          md: 12,
          lg: 12,
        },
      },
    ],
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
