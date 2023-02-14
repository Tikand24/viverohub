<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-card-title class="text-h2 font-weight-black"
            >Familias</v-card-title
          >
          <v-card-title>
            <v-btn
              color="primary"
              dark
              @click.stop="dialogCreate = !dialogCreate"
              >Crear familia</v-btn
            >
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="perPage"
            :loading="loading"
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
                    x-small
                    color="orange"
                    v-on="on"
                    v-on:click="editFamily(item)"
                  >
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="red"
                    v-on="on"
                    v-on:click="removeFamily(item)"
                  >
                    <v-icon dark>mdi-delete</v-icon>
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
        <create-family
          @close="handleClose($event)"
          @onUpdate="hanldeUpdate($event)"
          @onSave="hanldeSave($event)"
          :value="familyToEdit"
        ></create-family>
      </v-navigation-drawer>
    </div>
    <v-dialog v-model="dialogRemove" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">
          Eliminar familia
        </v-card-title>
        <v-card-text
          >¿Esta seguro que desea eliminar la familia? Ningun dato se podra
          recuperar</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogRemove = false">
            Cancelar
          </v-btn>
          <v-btn
            :loading="loadingRemove"
            color="green darken-1"
            text
            @click="handleRemove()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { FAMILY_GET_ALL, FAMILY_REMOVE } from "@/store/masters";
import CreateFamily from "../../../components/Family/CreateFamily.vue";
export default {
  name: "Family",
  components: {
    CreateFamily,
  },
  data: () => ({
    familyToEdit: null,
    footerPropsTable: {
      "items-per-page-options": [5, 10, 15],
      "page-text": "",
      "items-per-page-text": "Registros por pagina",
      firstIcon: "",
      lastIcon: "",
      prevIcon: "",
      nextIcon: "",
    },
    idFamilyToRemove: null,
    dialogRemove: false,
    loadingRemove: false,
    itemSelected: {},
    dialogCreate: null,
    numberSearch: 1,
    currentPage: 1,
    numeroPaginas: 1,
    path: "",
    perPage: 5,
    loading: false,
    search: "",
    optionsTable: {},
    headers: [
      { text: "Familia", value: "family.name" },
      { text: "Cabeza de hogar", value: "family.headFamilyFirstName" },
      { text: "Telefono", value: "family.headFamilyPhone" },
      { text: "Estado", value: "status" },
      { text: "Opciones", value: "action" },
    ],
  }),
  computed: {
    items() {
      return this.$store.getters.families;
    },
  },
  watch: {},
  methods: {
    hanldeSave: function() {
      this.dialogCreate = false;
      this.fetchAllFamilies();
    },
    handleClose: function(event) {
      this.dialogCreate = false;
      this.familyToEdit = null;
      if (event) {
        this.dialogCreate = false;
      } else {
        this.dialogCreate = false;
      }
    },
    hanldeUpdate: function(event) {
      if (event) {
        this.dialogCreate = false;
        this.fetchAllFamilies();
      }
    },
    fetchAllFamilies: async function() {
      try {
        this.loading = true;
        await this.$store.dispatch(FAMILY_GET_ALL).catch(() => {
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    editFamily: function(item) {
      this.familyToEdit = item;
      this.dialogCreate = true;
    },
    removeFamily: function(item) {
      this.idFamilyToRemove = item.id;
      this.dialogRemove = true;
    },
    handleRemove: async function() {
      try {
        this.loadingRemove = true;
        await this.$store
          .dispatch(FAMILY_REMOVE, this.idFamilyToRemove)
          .then(() => {
            this.fetchAllFamilies();
            this.loadingRemove = false;
            this.dialogRemove = false;
          })
          .catch(() => {
            this.loadingRemove = false;
            this.dialogRemove = false;
          });
        this.loadingRemove = false;
      } catch (error) {
        this.loadingRemove = false;
      }
    },
  },
  mounted() {
    if (this.items.length <= 0) {
      this.fetchAllFamilies();
    }
  },
};
</script>

<style></style>
