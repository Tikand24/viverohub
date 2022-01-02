<template>
  <div class="create-list-container">
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div> <h1 class="h3">Operar lista</h1> </div>
          <div>
            <v-btn
              class="mr-2"
              icon
              tile
              color="teal"
              outlined
              ><v-icon dark>mdi-check</v-icon></v-btn
            ><v-btn
              class="ml-2"
              icon
              tile
              color="teal"
              outlined
              @click="closeComponent()"
              ><v-icon dark>mdi-close</v-icon></v-btn
            >
          </div>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row class="text-caption">
              <v-col cols="12" md="4">
                <div class="grey--text mb-2">Lista</div>
                <div class="font-weight-medium">{{ list.name }}</div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="grey--text mb-2">Ruta</div>
                <div class="font-weight-medium" v-if="list.route">{{ list.route.name }}</div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="grey--text mb-2">Cliente</div>
                <div class="font-weight-medium" v-if="list.customer">{{ list.customer.name }}</div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="grey--text mb-2">% de cliente</div>
                <div class="font-weight-medium" v-if="list.customer">{{ list.customer.percentage }}</div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="grey--text mb-2">Telefono</div>
                <div class="font-weight-medium" v-if="list.customer">{{ list.customer.phone }}</div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="grey--text mb-2">Correo electronico</div>
                <div class="font-weight-medium" v-if="list.customer">{{ list.customer.email }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="number"
                  v-model="globalPercentage"
                  label="Porcentaje global "
                  append-outer-icon="mdi-send"
                  @click:append-outer="applyPercentage"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h3>Productos de la lista</h3>
              </v-col>
              <v-col cols="12"
                ><v-simple-table dense fixed-header height="300px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Planta</th>
                        <th class="text-left">Cantidad</th>
                        <th class="text-left">Base c/u</th>
                        <th class="text-left">% c/u</th>
                        <th class="text-left">Facturado c/u</th>
                        <th class="text-left">Total</th>
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
                              v-model="item.plant.unitValue"
                              label="Base"
                            ></v-text-field>
                          </template>
                          <template v-else>
                            $
                            {{
                              item.plant.unitValue.toLocaleString(
                                "es-ES",
                                formatCurrency
                              )
                            }}
                          </template>
                        </td>
                        <td class="text-left">
                          <template v-if="item.isEdit">
                            <v-text-field
                              type="number"
                              v-model="item.percentage"
                              label="Porcentaje "
                            ></v-text-field
                          ></template>
                          <template v-else>{{ item.percentage }} %</template>
                        </td>
                        <td class="text-left">
                          $
                          {{
                            invoicedValue(item)
                              .toLocaleString("es-ES", formatCurrency)
                              .replace("COP", "")
                          }}
                        </td>
                        <td class="text-left">
                          $
                          {{
                            totalValue(item)
                              .toLocaleString("es-ES", formatCurrency)
                              .replace("COP", "")
                          }}
                        </td>
                        <td class="text-left">
                          <v-icon
                            dark
                            small
                            :color="item.isEdit ? 'green' : 'orange'"
                            v-on:click="editProduct(item)"
                            >mdi-pencil</v-icon
                          >
                          <v-icon
                            dark
                            small
                            color="red"
                            v-on:click="deleteProduct(item)"
                            >mdi-delete</v-icon
                          >
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4"></td>
                        <td>Total: </td>
                        <td>$ {{ totalList }}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
  </div>
</template>

<script>
import { PLANT_GET_ALL } from "@/store/plants";
import { SNACK_SHOW } from "@/store/snackbar";

export default {
  name: "OperateList",
  props: ["value"],
  components: {},
  data: () => ({
    plant: { bag: { id: null, value: "", peso: 0 } },
    quantity: "",
    globalPercentage: 0,
    list: {
      id: null,
      customer: null,
      name: "",
      route: "",
      percentage: "",
      observation: "",
    },
    loading: false,
    items: [],
    formatCurrency: {
      style: "currency",
      currency: "COP",
    },
  }),
  watch: {
    value(val) {
      if (val) {
        this.list = val;
        val.products.forEach((p) => {
          p.percentage = parseInt(this.list.customer.percentage);
          p.invoiced = 0;
          p.totalValue = p.invoiced * parseInt(p.quantity);
        });
        this.items = val.products;
      }
    },
  },
  computed: {
    plants() {
      return this.$store.getters.plants;
    },
    totalList() {
      let total = 0;
      this.items.forEach(i=>{
        total = total + parseInt(i.totalValue);
      })
      return total.toLocaleString("es-ES", this.formatCurrency)
                              .replace("COP", "");
    },
  },
  methods: {
    invoicedValue: function (val) {
      val.invoiced =
        parseInt(val.plant.unitValue) +
        parseInt(val.plant.unitValue) * (parseInt(val.percentage) / 100);
      return val.invoiced;
    },
    totalValue: function (val) {
      val.totalValue = val.invoiced * parseInt(val.quantity);
      return val.totalValue;
    },
    applyPercentage: function () {
      console.log("perfecn", this.globalPercentage);
      this.items.forEach((p) => {
        p.percentage = this.globalPercentage;
      });
    },
    closeComponent: function () {
      this.$emit("close");
    },
    editProduct(item) {
      item.isEdit = !item.isEdit;
    },
    deleteProduct(item) {
      const index = this.items.indexOf(item);
      if (index != -1) {
        this.items.splice(index, 1);
      }
      this.$store.commit(SNACK_SHOW, {
        msg: "Lista guardada correctamente",
        color: "success",
      });
    },
    fetchAllPlants: function () {
      console.log("fetchPlants");
      this.$store.dispatch(PLANT_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
  },
  mounted() {
    if (this.plants.length <= 0) {
      this.fetchAllPlants();
    }
  },
};
</script>

<style scoped>
.create-list-container {
  overflow: auto;
}
</style>