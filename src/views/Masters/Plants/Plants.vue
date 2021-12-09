<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-card-title>Plantas</v-card-title>
          <v-card-title>
            <v-btn
              color="primary"
              dark
              @click.stop="dialogCreate = !dialogCreate"
              >Crear planta</v-btn
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
            :footer-props="footerPropsTable"
            :options.sync="optionsTable"
            :items-per-page="perPage"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn class="mx-2" fab dark small color="success" v-on="on">
                    <v-icon dark>mdi-assignment-ind</v-icon>
                  </v-btn>
                </template>
                <span>Generar Partida</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="light-blue"
                    v-on="on"
                  >
                    <v-icon dark>mdi-file</v-icon>
                  </v-btn>
                </template>
                <span>Generar Borrador</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="orange"
                    v-on="on"
                    v-on:click="editar(item)"
                  >
                    <v-icon dark>mdi-edit</v-icon>
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
          <v-pagination
            v-model="currentPage"
            :length="numeroPaginas"
            :total-visible="10"
          ></v-pagination>
        </v-container>
      </v-card>
    </v-container>
    <div class="text-center">
      <v-navigation-drawer
        v-model="dialogCreate"
        right
        absolute
        temporary
        width="35vw"
        :permanent="dialogCreate"
      >
        <create-plant @close="handleClose($event)"></create-plant>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
  import PLANTS_MODULE from '@/store/index'
import { PLANT_GET_ALL } from "@/store/plants";
import CreatePlant from "../../../components/Plants/CreatePlant.vue";
export default {
  name: "Plants",
  components: {
    CreatePlant,
  },
  data: () => ({
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
      {
        text: "Num",
        align: "left",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Libro", value: "libro" },
      { text: "Folio", value: "folio" },
      { text: "Partida", value: "partida" },
      { text: "Opciones", value: "action" },
    ],
    items: [],
  }),
  watch: {},
  methods: {
    handleClose: function (event) {
      console.log("handle", event);
      this.dialogCreate = false;
      if (event) {
        this.dialogCreate = false;
      } else {
        this.dialogCreate = false;
      }
    },
    fetchAllPlants: function () {
      console.log("fethcSec");
      PLANTS_MODULE.dispatch(PLANT_GET_ALL)
        .catch(error => {
          console.log('error',error);
        })
    },
  },
  mounted() {
    this.fetchAllPlants();
  },
};
</script>

<style>
</style>