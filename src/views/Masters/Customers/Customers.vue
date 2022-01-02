<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-card-title>Clientes</v-card-title>
          <v-card-title>
            <v-btn
              color="primary"
              dark
              @click.stop="dialogCreate = !dialogCreate"
              >Crear cliente</v-btn
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
                    v-on:click="editCustomer(item)"
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
    <div class="text-center">
      <v-navigation-drawer
        v-model="dialogCreate"
        right
        temporary
        :width="$vuetify.breakpoint.lgAndUp ? '35vw' : '100vw'"
        :permanent="dialogCreate"
        app
      >
        <create-customer
          @close="handleClose($event)"
          :value="customerEdit"
        ></create-customer>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import { CUSTOMER_GET_ALL } from "@/store/masters";
import CreateCustomer from "../../../components/Customers/CreateCustomer.vue";
export default {
  name: "Customers",
  components: {
    CreateCustomer,
  },
  data: () => ({
    customerEdit: null,
    footerPropsTable: {
      "items-per-page-options": [5, 10, 15],
      "page-text": "",
      "items-per-page-text": "Registros por pagina",
      firstIcon: "",
      lastIcon: "",
      prevIcon: "",
      nextIcon: "",
    },
    itemSelected: {},
    dialogCreate: null,
    numberSearch: 1,
    currentPage: 1,
    numeroPaginas: 1,
    path: "",
    perPage: 5,
    loading: true,
    search: "",
    optionsTable: {},
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Identificacion", value: "document" },
      { text: "Telefono", value: "phone" },
      { text: "Correo", value: "email" },
      { text: "Ruta", value: "route.name" },
      { text: "Opciones", value: "action" },
    ],
  }),
  computed: {
    items() {
      return this.$store.getters.customers;
    },
  },
  watch: {},
  methods: {
    handleClose: function (event) {
      this.dialogCreate = false;
      if (event) {
        this.dialogCreate = false;
      } else {
        this.dialogCreate = false;
      }
    },
    fetchAllCustomers: function () {
      this.$store.dispatch(CUSTOMER_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    editCustomer: function (item) {
      this.customerEdit = item;
      this.dialogCreate = true;
    },
  },
  mounted() {
    if(this.items.length<=0){
    this.fetchAllCustomers();
    }
  },
};
</script>

<style>
</style>