<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-card-title>Listas</v-card-title>
          <v-card-title>
            <v-btn
              color="primary"
              dark
              @click.stop="dialogCreate = !dialogCreate"
              >Crear lista</v-btn
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
                  <v-icon
                    dark
                    small
                    color="orange"
                    v-on="on"
                    v-on:click="editList(item)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editar</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    small
                    color="blue"
                    v-on="on"
                    v-on:click="operateList(item)"
                    >mdi-list-status</v-icon
                  >
                </template>
                <span>Operar lista</span>
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
        <create-list
          @close="handleClose($event)"
          :value="listEdit"
        ></create-list>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-model="dialogOperate"
        right
        temporary
        :width="$vuetify.breakpoint.lgAndUp ? '45vw' : '100vw'"
        :permanent="dialogOperate"
        app
      >
        <operate-list
          @close="handleCloseOperate($event)"
          :value="listEdit"
        ></operate-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import { LIST_GET_ALL } from "@/store/plants";
import CreateList from "../../../components/Lists/CreateList.vue";
import OperateList from "../../../components/Lists/OperateList.vue";
export default {
  name: "Lists",
  components: {
    CreateList,
    OperateList
  },
  data: () => ({
    listEdit: null,
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
    dialogOperate:null,
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
      { text: "Cliente", value: "customer.name" },
      { text: "Ruta", value: "route.name" },
      { text: "Estado", value: "status" },
      { text: "Opciones", value: "action" },
    ],
  }),
  computed: {
    items() {
      return this.$store.getters.lists;
    },
  },
  watch: {},
  methods: {
    handleClose: function (event) {
      this.dialogCreate = false;
      this.listEdit = null;
      if (event) {
        this.dialogCreate = false;
      } else {
        this.dialogCreate = false;
      }
    },
    handleCloseOperate: function (event) {
      this.dialogOperate = false;
      this.listEdit = null;
      if (event) {
        this.dialogOperate = false;
      } else {
        this.dialogOperate = false;
      }
    },
    fetchAllLists: function () {
      this.$store.dispatch(LIST_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    editList: function (item) {
      this.listEdit = item;
      this.dialogCreate = true;
    },
    operateList: function (item) {
      this.listEdit = item;
      this.dialogOperate = true;
    },
  },
  mounted() {
    if (this.items.length <= 0) {
      this.fetchAllLists();
    }
  },
};
</script>

<style>
</style>