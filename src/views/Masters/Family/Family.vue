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
            dense
            class="elevation-1"
            :search="search"
            ><template v-slot:top>
              <div class="d-flex justify-end mb-6">
                <v-btn
                  class="ma-2"
                  dark
                  color="green"
                  @click="() => handleDownloadExcel()"
                >
                  <v-icon dark>mdi-file-excel</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  dark
                  color="red"
                  @click="() => handleMigration()"
                >
                  <v-icon dark>mdi-file-excel</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.family.grupoSisben="{ item }">
              <template v-if="item.family.grupoSisben">
                <template v-if="item.family.grupoSisben.split(':').length > 1">
                  <v-chip
                    :color="sisbenColor(item.family.grupoSisben)"
                    dark
                    small
                  >
                    {{ item.family.grupoSisben.split(":")[0] }}
                  </v-chip>
                  {{ item.family.grupoSisben.split(":")[1] }}
                </template>
              </template>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="orange"
                    class="mx-2"
                    v-on:click="editFamily(item)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editar</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    color="red"
                    class="mx-2"
                    v-on:click="removeFamily(item)"
                    >mdi-delete</v-icon
                  >
                </template>
                <span>Eliminar</span>
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
import dayjs from "dayjs";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FAMILY_GET_ALL, FAMILY_REMOVE, FAMILY_SET } from "@/store/masters";
import CreateFamily from "../../../components/Family/CreateFamily.vue";
import relativeTime from "dayjs/plugin/relativeTime";
import { SNACK_SHOW } from "@/store/snackbar";
import getColorSisben from "../../../utils/ParseDataFamily";
import "dayjs/locale/es";

dayjs.locale("es");
dayjs.extend(relativeTime);
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
    perPage: 15,
    loading: false,
    search: "",
    optionsTable: {},
    headers: [
      { text: "Cabeza de hogar", value: "family.headFamilyFirstName" },
      { text: "Cedula", value: "family.headFamilyIdentification" },
      { text: "Telefono", value: "family.headFamilyPhone" },
      { text: "Genero", value: "family.headFamilyGender" },
      { text: "Sisben", value: "family.grupoSisben" },
      { text: "Grupo Etnico", value: "family.grupoEtnico" },
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
    sisbenColor: function(sisben) {
      return getColorSisben(sisben);
    },
    handleMigration: async function() {
      await this.$store
        .dispatch(FAMILY_SET, {})
        .then((response) => {
          console.log("create list fnc", response);
          this.$store.commit(SNACK_SHOW, {
            msg: "Familia guardada correctamente",
            color: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
          this.$store.commit(SNACK_SHOW, {
            msg: "Error al guardar la planta",
            color: "error",
          });
        });
    },
    handleDownloadExcel: function() {
      const workbook = new ExcelJS.Workbook();
      const rows = [];
      this.items.forEach((item) => {
        rows.push([
          item.family.nombre,
          item.family.headFamilyTypeId.name,
          item.family.headFamilyIdentification,
          `${item.family.headFamilyFirstName} ${item.family.headFamilyLastName}`,
          item.family.headFamilyRelationship.name,
          item.family.headFamilyGender,
          item.family.headFamilyPhone,
          item.family.birthDate,
          item.family.birthDate
            ? dayjs(item.family.birthDate).fromNow(true)
            : 0,
        ]);
        item.familyMembers.forEach((familyMember) => {
          rows.push([
            item.family.nombre,
            familyMember.typeId.name,
            familyMember.identification,
            `${familyMember.firstName} ${familyMember.lastName}`,
            familyMember.relationship.name,
            familyMember.gender,
            familyMember.phone,
            familyMember.birthDate,
            familyMember.birthDate
              ? dayjs(familyMember.birthDate).fromNow(true)
              : "0",
          ]);
        });
      });
      const worksheetFilter = workbook.addWorksheet("familias");
      worksheetFilter.addTable({
        name: "MyTable",
        ref: "A1",
        headerRow: true,
        totalsRow: true,
        columns: [
          { name: "Familia", filterButton: true },
          { name: "Tipo de documento", filterButton: true },
          { name: "Numero identificacion", filterButton: true },
          { name: "Nombre del miembro", filterButton: true },
          { name: "Relacion Familiar", filterButton: true },
          { name: "Genero", filterButton: true },
          { name: "Telefono de contacto", filterButton: true },
          { name: "Fecha de nacimiento", filterButton: true },
          { name: "Edad", filterButton: true },
        ],
        rows: rows,
      });
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "acfpfamilias.xlsx"
        );
      });
    },
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
        await this.$store.dispatch(FAMILY_GET_ALL).catch(() => {});
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
