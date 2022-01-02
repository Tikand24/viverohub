<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-card-title>Balances</v-card-title>
          <v-card-title>
            <v-btn color="primary" dark to="balances/manage"
              >Crear balance</v-btn
            >
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="perPage"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.month="{ item }">
              {{ getMonthBalance(item.month) }}
            </template>
            <template v-slot:item.sales="{ item }">
              <v-chip color="green" dark>
                $ {{ item.totalSale.toLocaleString("es-ES", formatCurrency) }}
              </v-chip>
            </template>
            <template v-slot:item.totalExpenes="{ item }">
              <v-chip color="red" dark>
                $
                {{ item.totalExpenes.toLocaleString("es-ES", formatCurrency) }}
              </v-chip>
            </template>
            <template v-slot:item.totalPlants="{ item }">
              {{ getTotalPlants(item.sales) }}
            </template>
            <template v-slot:item.totlaWeight="{ item }">
              {{ getTotalWeight(item.sales) }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="orange"
                     v-on="on"
                    :to="`balances/manage/${item.id}`"
                  >
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>
            </template>
            <template slot="no-data">
              <v-alert
                v-if="!loading"
                :value="true"
                color="error"
                icon="mdi-alert"
              >
                Lo sentimos, no tenemos registros para mostrar.
                <v-icon>mdi-emoticon-dead-outline</v-icon>
              </v-alert>
              <v-alert
                v-else
                :value="true"
                color="info"
                icon="mdi-information-outline"
              >
                Estamos cargando los registros.
                <v-icon>mdi-emoticon-excited-outline</v-icon>
              </v-alert>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { BALANCE_GET_ALL } from "@/store/plants";
export default {
  name: "Balance",
  components: {},
  data: () => ({
    formatCurrency: {
      style: "currency",
      currency: "COP",
    },
    perPage: 5,
    loading: true,
    search: "",
    headers: [
      { text: "Mes balance", value: "month" },
      { text: "Facturacion", value: "sales" },
      { text: "Gastos", value: "totalExpenes" },
      { text: "Plantas facturadas", value: "totalPlants" },
      { text: "Toneladas", value: "totlaWeight" },
      { text: "Opciones", value: "action" },
    ],
  }),
  computed: {
    items() {
      return this.$store.getters.balances;
    },
  },
  watch: {},
  methods: {
    fetchAllBalances: function () {
      this.$store
        .dispatch(BALANCE_GET_ALL)
        .then((response) => {
          console.log("fetchAllBalances", response);
          if (response) {
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log("error", error);
        });
    },
    editPlant: function (item) {
      this.plantEdit = item;
    },
    getTotalPlants: function (items) {
      let totalPlants = 0;
      items.forEach((p) => {
        totalPlants = totalPlants + parseInt(p.quantity);
      });
      return totalPlants;
    },
    getTotalWeight: function (items) {
      let totalWeight = 0;
      items.forEach((p) => {
        totalWeight =
          totalWeight + parseInt(p.plant.bag.peso) * parseInt(p.quantity);
      });

      return `${totalWeight / 1000} `;
    },
    getMonthBalance: function (date) {
      return new Date(date).toLocaleString("es-ES", {
        month: "long",
      });
    },
  },
  mounted() {
    if (this.items.length <= 0) {
      this.fetchAllBalances();
    }
  },
};
</script>

<style>
</style>