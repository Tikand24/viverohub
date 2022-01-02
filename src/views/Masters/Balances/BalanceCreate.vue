<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title
          >{{ id ? "Editar" : "Crear" }} Balance Mes {{ monthBalance }}
          <v-btn
            class="ma-2"
            text
            icon
            color="blue"
            @click="updateMonth = !updateMonth"
          >
            <v-icon>mdi-update</v-icon>
          </v-btn>
        </v-card-title>
        <v-col cols="12" v-if="updateMonth">
          <v-dialog
            ref="dialog"
            v-model="modalMonth"
            :return-value.sync="dateBalance"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateBalance"
                label="Mes de balance"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateBalance" type="month" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalMonth = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(dateBalance)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-row class="text-center">
          <v-col cols="12">
            <select-plant :plants="plants" :showPrice="true" @onAddItem="addItem"></select-plant>
          </v-col>
          <v-col cols="12"
            ><v-simple-table dense fixed-header height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Planta</th>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Precio</th>
                    <th class="text-left">venta</th>
                    <th class="text-left">opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td class="text-left">
                      {{ item.plant.name }}
                    </td>
                    <td class="text-left">
                      <template v-if="item.isEdit">
                        <v-text-field
                          type="number"
                          v-model="item.quantity"
                          label="Canitdad"
                        ></v-text-field>
                      </template>
                      <template v-else>
                        {{ item.quantity }}
                      </template>
                    </td>
                    <td class="text-left">
                      <template v-if="item.isEdit">
                        <v-text-field
                          type="number"
                          v-model="item.price"
                          label="Precio"
                          prefix="$"
                        ></v-text-field>
                      </template>
                      <template v-else>
                        ${{
                          item.price.toLocaleString("es-ES", formatCurrency)
                        }}
                      </template>
                    </td>
                    <td class="text-left">
                      <v-text-field
                        prefix="$"
                        type="number"
                        v-model="item.neto"
                        :counter="10"
                        label="Neto"
                        required
                      ></v-text-field>
                    </td>
                    <td class="text-left">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="orange"
                        v-on:click="editBalance(item)"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="red"
                        v-on:click="deleteBalance(item)"
                      >
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12"
            ><v-alert type="success"
              >Venta total: ${{
                totalSell.toLocaleString("es-ES", formatCurrency)
              }}</v-alert
            ><v-alert type="error"
              >Gastos: ${{
                totalNeto.toLocaleString("es-ES", formatCurrency)
              }}</v-alert
            >
            <v-alert type="warning"
              >Ganancia:${{
                totalGanancia.toLocaleString("es-ES", formatCurrency)
              }}
            </v-alert>
            <v-alert type="info"
              >Reparto:${{
                totalReparto.toLocaleString("es-ES", formatCurrency)
              }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="expenseType"
              :items="expenseTypes"
              label="Producto"
              item-text="description"
              item-value="id"
              return-object
              single-line
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              prefix="$"
              type="number"
              v-model="priceExpenses"
              :counter="10"
              label="Valor"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="observationExpense"
              label="Observacion"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12"
            ><v-btn class="ma-2" outlined color="orange" @click="addExpense()">
              Agregar
            </v-btn>
          </v-col>
          <v-col cols="12"
            ><v-simple-table dense fixed-header height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Tipo de gasto</th>
                    <th class="text-left">Descripcion</th>
                    <th class="text-left">Valor gasto</th>
                    <th class="text-left">opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in expenses" :key="`expen${index}`">
                    <td class="text-left">
                      {{ item.expenseType.description }}
                    </td>
                    <td class="text-left">
                      <template v-if="item.isEdit">
                        <v-text-field
                          type="number"
                          v-model="item.observation"
                          label="Observacion"
                        ></v-text-field>
                      </template>
                      <template v-else>
                        {{ item.observation }}
                      </template>
                    </td>
                    <td class="text-left">
                      <template v-if="item.isEdit">
                        <v-text-field
                          type="number"
                          v-model="item.priceExpenses"
                          label="Precio"
                          prefix="$"
                        ></v-text-field>
                      </template>
                      <template v-else>
                        ${{
                          item.priceExpenses.toLocaleString(
                            "es-ES",
                            formatCurrency
                          )
                        }}
                      </template>
                    </td>
                    <td class="text-left">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="orange"
                        v-on:click="editExpense(item)"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="red"
                        v-on:click="deleteExpense(item)"
                      >
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12"
            ><v-alert type="error"
              >Gastos totales: ${{
                totalExpenses.toLocaleString("es-ES", formatCurrency)
              }}</v-alert
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"
            ><v-btn class="ma-2" outlined color="green" @click="save()">
              {{ id ? 'Editar' : 'Guardar'}} balance
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-overlay :absolute="true" :value="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script>
import {
  PLANT_GET_ALL,
  BALANCE_SET,
  BALANCE_GET,
  BALANCE_UPDATE,
} from "@/store/plants";
import { SNACK_SHOW } from "@/store/snackbar";
import SelectPlant from '../../../components/Plants/SelectPlant.vue';
export default {
  name: "Balance",
  components:{
    SelectPlant
  },
  data: () => ({
    id: null,
    loading: false,
    plant: { bag: { id: null, value: "", peso: 0 } },
    quantity: "",
    price: "",
    items: [],
    formatCurrency: {
      style: "currency",
      currency: "COP",
    },
    dateBalance: new Date().toISOString().substr(0, 7),
    modalMonth: false,
    updateMonth: false,
    expenseType: null,
    observationExpense: "",
    priceExpenses: 0,
    expenses: [],
  }),
  watch: {
    $route(val) {
      console.log("routeChange", val);
    },
  },
  computed: {
    totalSell: function () {
      let totalPrice = 0;
      this.items.forEach((i) => {
        totalPrice = totalPrice + i.quantity * i.price;
      });
      return totalPrice;
    },
    totalNeto: function () {
      let totalNeto = 0;
      this.items.forEach((i) => {
        totalNeto = totalNeto + i.quantity * i.neto;
      });
      return totalNeto;
    },
    totalGanancia: function () {
      let totalGanancia = 0;
      if (this.totalSell != 0) {
        totalGanancia = this.totalSell - this.totalNeto;
      }
      return totalGanancia;
    },
    totalReparto: function () {
      let totalReparto = 0;
      if (this.totalGanancia != 0) {
        totalReparto = this.totalGanancia / 2;
      }
      return totalReparto;
    },
    totalExpenses: function () {
      let totalPrice = 0;
      this.expenses.forEach((i) => {
        totalPrice = totalPrice + parseInt(i.priceExpenses);
      });
      return totalPrice;
    },
    plants() {
      return this.$store.getters.plants;
    },
    expenseTypes() {
      return this.$store.getters.complements.expenseTypes;
    },
    monthBalance() {
      return new Date(`${this.dateBalance}-02`).toLocaleString("es-ES", {
        month: "long",
      });
    },
  },
  methods: {
    addItem: function (val) {
      
      this.items.push({
        plant:val.plant,
        quantity:val.quantity,
        price:val.price,
        neto: 0,
        isEdit: false,
      });
    },
    deleteBalance(item) {
      const index = this.items.indexOf(item);
      if (index != -1) {
        this.items.splice(index, 1);
      }
    },
    editBalance(item) {
      item.isEdit = !item.isEdit;
    },

    addExpense: function () {
      if (!this.expenseType.id) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Seleccione un tipo de gasto",
          color: "warning",
        });
        return false;
      }
      if (this.priceExpenses.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Seleccione el valor del gasto",
          color: "warning",
        });
        return false;
      }
      this.expenses.push({
        expenseType: this.expenseType,
        observation: this.observationExpense,
        priceExpenses: this.priceExpenses,
        isEdit: false,
      });
      this.expenseType = null;
      this.priceExpenses = 0;
      this.observationExpense = "";
    },
    deleteExpense(item) {
      const index = this.expenses.indexOf(item);
      if (index != -1) {
        this.expenses.splice(index, 1);
      }
    },
    editExpense(item) {
      item.isEdit = !item.isEdit;
    },
    fetchAllPlants: function () {
      this.$store.dispatch(PLANT_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    save: async function () {
      const balance = {
        id:this.id,
        month: new Date(`${this.dateBalance}-02`).toISOString(),
        sales: this.items,
        expenses: this.expenses,
        totalSale: this.totalSell,
        expenseSale: this.totalNeto,
        gain: this.totalGanancia,
        distribution: this.totalReparto,
        totalExpenes: this.totalExpenses,
      };
      this.loading = true;
      if (this.id) {
        await this.$store
          .dispatch(BALANCE_UPDATE, balance)
          .then((response) => {
            console.log("create balance fnc", response);
            this.loading = false;
            this.$store.commit(SNACK_SHOW, {
              msg: "Balance guardado correctamente",
              color: "success",
            });
            this.$router.push('/masters/balances')
          })
          .catch((err) => {
            console.log("err", err);
            this.loading = false;
            this.$store.commit(SNACK_SHOW, {
              msg: "Error al guardar el balance",
              color: "error",
            });
          });
      } else {
        await this.$store
          .dispatch(BALANCE_SET, balance)
          .then((response) => {
            console.log("create balance fnc", response);
            this.loading = false;
            this.$store.commit(SNACK_SHOW, {
              msg: "Balance guardado correctamente",
              color: "success",
            });
          })
          .catch((err) => {
            console.log("err", err);
            this.loading = false;
            this.$store.commit(SNACK_SHOW, {
              msg: "Error al guardar el balance",
              color: "error",
            });
          });
      }
    },
    fetchData: async function () {
      this.loading = true;
      const fetchedId = this.$route.params.id;
      await this.$store
        .dispatch(BALANCE_GET, fetchedId)
        .then((response) => {
          this.loading = false;
          this.id = response.id;
          this.dateBalance = new Date(response.month)
            .toISOString()
            .substr(0, 7);
          this.items = response.sales;
          this.expenses = response.expenses;
        })
        .catch((err) => {
          console.log("err", err);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Error al obtener el balance",
            color: "error",
          });
        });
    },
  },
  mounted() {
    if (this.plants.length <= 0) {
      this.fetchAllPlants();
    }
    if (this.$route.params.id) {
      this.fetchData();
    }
  },
};
</script>
