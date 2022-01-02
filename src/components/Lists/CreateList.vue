<template>
  <div class="create-list-container">
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div>{{ list.id ? "Editar lista" : "Crear lista" }}</div>
          <div>
            <v-btn
              class="mr-2"
              icon
              tile
              color="teal"
              outlined
              @click="list.id ? updateList() : saveList()"
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
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="list.name"
                  label="Nombre"
                  persistent-hint
                  hint="Por favor ingresa el nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="list.customer"
                  :items="customers"
                  label="Cliente"
                  item-text="name"
                  item-value="value"
                  return-object
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="list.route"
                  :items="routes"
                  label="Ruta"
                  item-text="name"
                  item-value="value"
                  return-object
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  type="number"
                  outlined
                  v-model="list.percentage"
                  label="% por unidad"
                  persistent-hint
                  hint="Por favor ingresa el % por unidad"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="list.observation"
                  label="Observacion"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                  shaped
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h3>Productos de la lista</h3>
              </v-col>
              <v-col cols="12">
                <select-plant
                  :plants="plants"
                  @onAddItem="handleChange"
                ></select-plant>
              </v-col>
              <v-col cols="12"
                ><v-simple-table dense fixed-header height="300px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Planta</th>
                        <th class="text-left">Cantidad</th>
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
import { PLANT_GET_ALL, LIST_SET, LIST_UPDATE } from "@/store/plants";
import { ROUTE_GET_ALL, CUSTOMER_GET_ALL } from "@/store/masters";
import { SNACK_SHOW } from "@/store/snackbar";
import SelectPlant from "../Plants/SelectPlant.vue";

export default {
  name: "CreateList",
  props: ["value"],
  components: {
    SelectPlant,
  },
  data: () => ({
    typeForm: "create",
    plant: { bag: { id: null, value: "", peso: 0 } },
    quantity: "",
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
  }),
  watch: {
    value(val) {
      if (val) {
        this.list = val;
        this.items = val.products;
      } else {
        this.resetList();
      }
    },
    "list.customer"(val) {
      if (val) {
        this.list.route = val.route;
        this.list.percentage = val.percentage;
      }
    },
  },
  computed: {
    plants() {
      return this.$store.getters.plants;
    },
    routes() {
      return this.$store.getters.routes;
    },
    customers() {
      return this.$store.getters.customers;
    },
  },
  methods: {
    handleChange: function (val) {
      this.items.push({
        plant: val.plant,
        quantity: val.quantity,
        price: val.price,
        neto: 0,
        isEdit: false,
      });
    },
    resetList: function () {
      this.list = {
        id: null,
        customer: null,
        name: "",
        route: "",
        percentage: "",
        observation: "",
      };
      this.items = [];
    },
    closeComponent: function () {
      this.$emit("close");
    },
    saveList: async function () {
      this.loading = true;
      const list = this.list;
      list.products = this.items;
      list.status = "activo";
      await this.$store
        .dispatch(LIST_SET, list)
        .then((response) => {
          console.log("create list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Lista guardada correctamente",
            color: "success",
          });
          this.$emit("close", this.list);
          this.resetList();
        })
        .catch((err) => {
          console.log("err", err);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Error al guardar la planta",
            color: "error",
          });
        });
    },
    updateList: async function () {
      this.loading = true;
      const list = this.list;
      list.products = this.items;
      list.status = "activo";
      await this.$store
        .dispatch(LIST_UPDATE, this.list)
        .then((response) => {
          console.log("update list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Planta Editada correctamente",
            color: "success",
          });
          this.$emit("close", this.list);
          this.resetList();
        })
        .catch((err) => {
          console.log("err", err);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Error al editar la planta",
            color: "error",
          });
        });
    },
    editProduct(item) {
      item.isEdit = !item.isEdit;
    },
    deleteProduct(item) {
      const index = this.items.indexOf(item);
      if (index != -1) {
        this.items.splice(index, 1);
      }
    },
    fetchAllRoutes: function () {
      console.log("fetchRoutes");
      this.$store.dispatch(ROUTE_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    fetchAllPlants: function () {
      console.log("fetchPlants");
      this.$store.dispatch(PLANT_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    fetchAllCustomers: function () {
      console.log("fetchCustomer");
      this.$store.dispatch(CUSTOMER_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
  },
  mounted() {
    if (this.plants.length <= 0) {
      this.fetchAllPlants();
    }
    if (this.routes.length <= 0) {
      this.fetchAllRoutes();
    }
    if (this.customers.length <= 0) {
      this.fetchAllCustomers();
    }
  },
};
</script>

<style scoped>
.create-list-container {
  overflow: auto;
}
</style>