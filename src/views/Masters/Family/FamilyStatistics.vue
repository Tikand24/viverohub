 <template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="({ actionIcon, actionText, ...attrs }, i) in stats"
            :key="i"
            cols="12"
            md="6"
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
          <v-col
            v-for="(chart, i) in charts"
            :key="`chart-${i}`"
            :cols="chart.colS ? chart.colS : '12'"
            :md="chart.colMd ? chart.colMd : '6'"
            :lg="chart.colLg ? chart.colLg : '4'"
          >
            <material-chart-card
              :color="chart.color"
              :data="chart.data"
              :options="chart.options"
              :responsive-options="chart.responsiveOptions"
              :title="chart.title"
              :type="chart.type"
            >
              <template #subtitle>
                <div class="font-weight-light text--secondary">
                  <div v-html="chart.subtitle" />
                </div>
              </template>

              <template #actions>
                <v-icon class="mr-1" small> mdi-clock-outline </v-icon>

                <span
                  class="text-caption grey--text font-weight-light"
                  v-text="chart.time"
                />
              </template>
            </material-chart-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <material-card color="orange" full-header>
          <template #heading>
            <div class="pa-8 white--text">
              <div class="text-h4 font-weight-light">
                Informacion de asociados
              </div>
              <div class="text-caption">
                Nuevos asociados al 15 de septiembre de 2020
              </div>
            </div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="families" />
          </v-card-text>
        </material-card>
      </v-col>

      <v-col cols="12" md="6">
        <material-card color="accent" full-header>
          <template #heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
              class="pa-8"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
                >Indices:</span
              >
              <v-tab class="mr-3">
                <v-icon class="mr-2"> mdi-face-woman </v-icon>
                Mujeres
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2"> mdi-face-man </v-icon>
                Hombres
              </v-tab>
              <v-tab>
                <v-icon class="mr-2"> mdi-account-multiple-plus </v-icon>
                Otros
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="tabs" background-color="transparent">
            <v-tab-item>
              <v-card-text>
                <v-data-table :headers="headerGender" :items="mujeresFamilia" />
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-data-table :headers="headerGender" :items="hombresFamilia" />
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-data-table :headers="headerGender" :items="otrosFamilia" />
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import MaterialStatCard from "../../../components/app/MaterialStatsCard.vue";
import MaterialChartCard from "../../../components/app/MaterialChartCard.vue";
import MaterialCard from "../../../components/app/MaterialCard.vue";
import { FAMILY_GET_ALL } from "@/store/masters";

const lineSmooth = Vue.chartist.Interpolation.cardinal({
  tension: 0,
});

export default {
  name: "FamilyStatistics",
  components: {
    MaterialStatCard,
    MaterialChartCard,
    MaterialCard,
  },
  data: () => ({
    charts: [
      {
        name: "cabezahogarbar",
        type: "Bar",
        color: "#FD9A13",
        title: "Cabezas de hogar",
        subtitle: "H: 14, M: 30",
        time: "actualizado hace 10 minutes ",
        data: {
          labels: ["Hombres", "Mujeres"],
          series: [[14, 30]],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 40,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
        colMd: "3",
        colLg: "2",
      },
      {
        name: "generoasociadosbar",
        type: "Bar",
        color: "primary",
        title: "Asociados",
        subtitle: "H: 14, M: 30",
        time: "actualizado hace 10 minutes ",
        data: {
          labels: ["Hombres", "Mujeres"],
          series: [[14, 30]],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 40,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
        colMd: "3",
        colLg: "2",
      },
      {
        type: "Line",
        color: "success",
        title: "Ingresos a la asociacion ",
        subtitle:
          '<i class="mdi mdi-arrow-up green--text"></i><span class="green--text">55%</span>&nbsp; Incluye insumos',
        time: "Actualizado hace 4 minutos",
        data: {
          labels: ["NOV", "DIC", "ENE", "FEB"],
          series: [[230, 750, 450, 300]],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        colMd: "3",
        colLg: "4",
      },
      {
        type: "Line",
        color: "info",
        title: "Horas trabajadas en lote",
        subtitle: "Ultima cosecha",
        time: "Campaña hace 26 minutos",
        data: {
          labels: ["L", "M", "X", "J", "V", "S", "D"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth,
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        colMd: "3",
        colLg: "4",
      },
    ],
    headers: [
      { text: "Familia", value: "family.name" },
      { text: "Cabeza de hogar", value: "family.headFamilyFirstName" },
      { text: "Telefono", value: "family.headFamilyPhone" },
      { text: "Estado", value: "status" },
    ],
    headerGender: [
      { text: "Nombre", value: "name" },
      { text: "Telefono", value: "phone" },
    ],
    items: [],
    stats: [
      {
        name: "socios",
        actionIcon: "mdi-av-timer",
        actionText: "Ultimos 30 dias",
        color: "info",
        icon: "mdi-account-multiple",
        title: "Numero de socios",
        value: "0",
      },
      {
        name: "campesinos",
        actionIcon: "mdi-av-timer",
        actionText: "Ultimos 30 dias",
        color: "primary",
        icon: "mdi-account-group",
        title: "Numero de campesinos",
        value: "184",
      },
      {
        name: "familias",
        actionIcon: "mdi-alert",
        actionText: "Soporte familiar",
        color: "#FD9A13",
        icon: "mdi-sofa-single",
        title: "Familias",
        value: "20",
      },
      {
        name: "ayudasfamilias",
        actionIcon: "mdi-calendar-range",
        actionText: "Ultimos 30 dias",
        color: "success",
        icon: "mdi-store",
        title: "Ayudas por familia",
        value: "$34,245",
      },
    ],
    tabs: 0,
    tasks: {
      0: [
        {
          text: 'Contractar con los socios"',
          value: true,
        },
        {
          text: "Recoger la informacion de cada uno de los socios",
          value: false,
        },
        {
          text: "Entrega de ayudas para los socios",
          value: false,
        },
      ],
      1: [
        {
          text: "Acta de reunion del 20 de diciembre 2020",
          value: true,
        },
        {
          text: "Acta de reunion del 20 de marzo 2020",
          value: true,
        },
      ],
      2: [
        {
          text: "Modificacion y soporte de plataforma",
          value: false,
        },
      ],
    },
  }),

  methods: {
    setNumeroSocios: function () {
      const stats = this.stats.find((s) => s.name == "socios");
      stats.value = this.families.length;
    },
    setNumeroCampesinos: function (){
      let socios = 0;
      this.families.forEach((f) => {
        socios = socios + (f.familyMembers.length + 1);
      });
      const stats = this.stats.find((s) => s.name == "campesinos");
      stats.value = socios;
    },
    setNumeroFamilias: function () {
      const stats = this.stats.find((s) => s.name == "familias");
      stats.value = this.families.length;
    },
    setCabezaHogarBar: function () {
      const chart = this.charts.find((s) => s.name == "cabezahogarbar");
      chart.data.series = [];

      chart.value = this.families.length;
    },
    fetchAllFamilies: function () {
      this.$store.dispatch(FAMILY_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    
  },
  watch: {
    families(val) {
      if (val) {
        this.setNumeroSocios();
      }
    },
  },
  computed: {
    families() {
      return this.$store.getters.families;
    },
    mujeresFamilia() {
      const muejeres = [];
      this.families.forEach((f) => {
        if (f.family) {
          if (f.family.headFamilyGender == "Mujer") {
            muejeres.push({
              name: `${f.family.headFamilyFirstName} ${f.family.headFamilyLastName}`,
              phone: f.family.headFamilyPhone,
            });
          }
        }
        if (f.familyMembers) {
          f.familyMembers.forEach((fm) => {
            if (fm.gender == "Mujer") {
              muejeres.push({
                name: `${fm.firstName} ${fm.lastName}`,
                phone: fm.phone,
              });
            }
          });
        }
      });
      return muejeres;
    },
    hombresFamilia() {
      const hombres = [];
      this.families.forEach((f) => {
        if (f.family) {
          if (f.family.headFamilyGender == "Hombre") {
            hombres.push({
              name: `${f.family.headFamilyFirstName} ${f.family.headFamilyLastName}`,
              phone: f.family.headFamilyPhone,
            });
          }
        }
        if (f.familyMembers) {
          f.familyMembers.forEach((fm) => {
            if (fm.gender == "Hombre") {
              hombres.push({
                name: `${fm.firstName} ${fm.lastName}`,
                phone: fm.phone,
              });
            }
          });
        }
      });
      return hombres;
    },
    otrosFamilia() {
      return [];
    },
  },
  mounted() {
    this.setNumeroSocios();
    this.fetchAllFamilies();
  },
};
</script>
