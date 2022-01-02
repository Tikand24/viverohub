<template>
  <div class="create-customer-container">
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div>{{ customer.id ? "Editar Cliente" : "Crear Cliente" }}</div>
          <div>
            <v-btn
              class="mr-2"
              icon
              tile
              color="teal"
              outlined
              @click="customer.id ? updateCustomer() : saveCustomer()"
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
                  v-model="customer.name"
                  label="Nombre"
                  persistent-hint
                  hint="Por favor ingresa el nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="customer.customName"
                  label="Nombre personalizado"
                  persistent-hint
                  hint="Por favor ingresa el Nombre personalizado"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="customer.code"
                  label="Codigo"
                  persistent-hint
                  hint="Por favor ingresa el codigo"
                ></v-text-field>
              </v-col>
              <v-col cols="5" md="5">
                <v-select
                  v-model="customer.tipDoc"
                  :items="tipeDocs"
                  label="Tipo identificacion"
                  item-text="value"
                  item-value="value"
                  return-object
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="7" md="7">
                <v-text-field
                  outlined
                  v-model="customer.document"
                  label="Identificacion"
                  persistent-hint
                  hint="Por favor ingresa la identificacion"
                ></v-text-field>
              </v-col>
              <v-col cols="7" md="7">
                <v-text-field
                  outlined
                  v-model="customer.percentage"
                  label="% en facturacion"
                  persistent-hint
                  hint="Por favor ingresa el % de facturacion"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="customer.phone"
                  label="Celular / WhatsApp"
                  persistent-hint
                  hint="Por favor ingresa el telefono celular"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="customer.email"
                  label="Correo electronico"
                  persistent-hint
                  hint="Por favor ingresa el correo electronico"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="customer.route"
                  :items="routes"
                  label="Ruta"
                  item-text="name"
                  item-value="value"
                  return-object
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="customer.observation"
                  label="Observacion"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                  shaped
                ></v-textarea>
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
import { CUSTOMER_SET, CUSTOMER_UPDATE,ROUTE_GET_ALL } from "@/store/masters";
import { SNACK_SHOW } from "@/store/snackbar";

export default {
  name: "CreateCustomer",
  props: ["value"],
  components: {},
  data: () => ({
    typeForm: "create",
    customer: {
      id: null,
      name: "",
      customName: "",
      code: "",
      tipDoc: "",
      document: "",
      phone: "",
      email: "",
      route: "",
      observation: "",
      percentage: 0,
      status: "Activo",
    },
    loading: false,
  }),
  watch: {
    value(val) {
      if (val) {
        this.customer = val;
      }
    },
  },
  computed: {
    tipeDocs() {
      return [
        { id: 1, value: "CC" },
        { id: 2, value: "NIT" },
        { id: 3, value: "Otro" },
      ];
    },
    routes() {
      return this.$store.getters.routes;
    },
  },
  methods: {
    resetCustomer: function () {
      this.customer = {
        id: null,
        name: "",
        customName: "",
        code: "",
        tipDoc: "",
        document: "",
        phone: "",
        email: "",
        route: "",
        observation: "",
        percentage: 0,
        status: "Activo",
      };
    },
    closeComponent: function () {
      this.$emit("close");
    },
    saveCustomer: async function () {
      this.loading = true;
      const customer = this.customer;
      customer.status = "activo";
      await this.$store
        .dispatch(CUSTOMER_SET, customer)
        .then((response) => {
          console.log("create list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Cliente guardada correctamente",
            color: "success",
          });
          this.$emit("close", this.customer);
          this.resetCustomer();
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
    updateCustomer: async function () {
      this.loading = true;
      const customer = this.customer;
      customer.status = "activo";
      await this.$store
        .dispatch(CUSTOMER_UPDATE, this.customer)
        .then((response) => {
          console.log("update list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Cliente Editada correctamente",
            color: "success",
          });
          this.$emit("close", this.customer);
          this.resetCustomer();
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
    fetchAllRoutes: function () {
      this.$store.dispatch(ROUTE_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
  },
  mounted() {
    if(this.routes.length == 0){
      this.fetchAllRoutes();
    }
  },
};
</script>

<style scoped>
.create-customer-container {
  overflow: auto;
}
</style>