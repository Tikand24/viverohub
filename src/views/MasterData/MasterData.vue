<template>
  <v-container id="dashboard-view" fluid tag="section">
    <v-row>
      <v-col
        v-for="(master, i) in masterData"
        :key="i"
        cols="12"
        :md="master.col.md"
        :lg="master.col.md"
      >
        <material-card :color="master.color" full-header>
          <template #heading>
            <div class="d-flex justify-space-between mb-6">
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light" v-if="master.title">
                  {{ master.title }}
                </div>
                <div class="text-caption" v-if="master.subtitle">
                  {{ master.subtitle }}
                </div>
              </div>
              <div class="pa-8 white--text">
                <v-btn
                  icon
                  color="white"
                  @click="() => handleDownloadExcel(master)"
                >
                  <v-icon>mdi-file-excel</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
          <v-card-text>
            <v-data-table
              dense
              :headers="master.headers"
              :items="master.data"
              class="mobile-data-scroll"
            >
              <template v-slot:item.family.grupoSisben="{ item }">
                <template v-if="item.family.grupoSisben">
                  <template
                    v-if="item.family.grupoSisben.split(':').length > 1"
                  >
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
              </template></v-data-table
            >
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import dayjs from "dayjs";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import MaterialCard from "@/components/app/MaterialCard.vue";
import { FAMILY_GET_ALL } from "@/store/masters";
import getColorSisben from "@/utils/ParseDataFamily";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.locale("es");
dayjs.extend(relativeTime);

export default {
  name: "MasterData",
  components: {
    MaterialCard,
  },
  data: () => ({
    hedaersExport: [
      { key: "name", label: "HOGAR" },
      { key: "headFamilyFirstName", label: "NOMBRE" },
      { key: "headFamilyIdentification", label: "CEDULA" },
      { key: "headFamilyGender", label: "GENERO" },
      { key: "headFamilyPhone", label: "TELEFONO" },
      { key: "email", label: "CORREO ELECTRONICO" },
      { key: "finca", label: "NOMBRE FINCA" },
      { key: "latitud", label: "COORD. LATITUD" },
      { key: "longitud", label: "COORD. LONGITUD" },
      { key: "registroCatastral", label: "REGISTRO CATASTRAL" },
      { key: "municipio", label: "MUNICIPIO" },
      { key: "vereda", label: "VEREDA" },
      { key: "numeroMiembrosHogar", label: "NUMBERO MIEMBROS HOGAR" },
      {
        key: "miembrosHogarEconomicamenteResponsables",
        label: "MIEMBROS HOGAR ECONOMICAMENTE ACTIVOS",
      },
      { key: "grupoEtnico", label: "GRUPO ETNICO" },
      { key: "lugarResidencia", label: "LUGAR DE RESIDENCIA" },
      {
        key: "afilicacionSeguridadSocial",
        label: "AFILIACION SEGURIDAD SOCIAL",
      },
      { key: "grupoSisben", label: "GRUPO SISBEN" },
      { key: "accesoTierra", label: "ACCESO TIERRA" },
      { key: "relacionTenenciaTierra", label: "RELACION TENENCIA TIERRA" },
      { key: "gastosUltimoMes", label: "GASTOS ULTIMO MES" },
      {
        key: "perteneceOrganizacionProductiva",
        label: "PERTENENCIA ORGANIZACION",
      },
      { key: "nombreOrganizacion", label: "NOMBRE ORGANIZACION" },
      { key: "tiempoHabitandoSectorRural", label: "TIEMPO HABITADO SEC RURAL" },

      { key: "birthDate", label: "FECHA NACIMIENTO" },
    ],
    masterData: [
      {
        col: {
          md: "12",
          lg: "12",
        },
        headers: [
          { text: "Cabeza de hogar", value: "family.nombre" },
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "Genero", value: "family.headFamilyGender" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "Todos",
        color: "orange",
        title: "Informacion de asociados",
        subtitle: "Informacion de los asociados sin ningun filtro",
      },
      {
        col: {
          md: "6",
          lg: "6",
        },
        headers: [
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "Mujeres",
        color: "purple",
        title: "Mujere rural",
      },
      {
        col: {
          md: "6",
          lg: "6",
        },
        headers: [
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "Genero", value: "family.headFamilyGender" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "Jovenes",
        color: "green",
        title: "Joven rural",
      },
      {
        col: {
          md: "6",
          lg: "6",
        },
        headers: [
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "Genero", value: "family.headFamilyGender" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "AdultoMayor",
        color: "brown",
        title: "Adulto mayor",
      },
      {
        col: {
          md: "6",
          lg: "6",
        },
        headers: [
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "Genero", value: "family.headFamilyGender" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "MujerCabezaFamilia",
        color: "teal",
        title: "Mujer cabeza de familia",
      },
      {
        col: {
          md: "6",
          lg: "6",
        },
        headers: [
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "Genero", value: "family.headFamilyGender" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "Discapacitado",
        color: "indigo",
        title: "Discapacitados",
      },
      {
        col: {
          md: "6",
          lg: "6",
        },
        headers: [
          { text: "Nombre", value: "family.headFamilyFirstName" },
          { text: "Cedula", value: "family.headFamilyIdentification" },
          { text: "Telefono", value: "family.headFamilyPhone" },
          { text: "Sisben", value: "family.grupoSisben" },
          { text: "No Miembros Hogar", value: "family.numeroMiembrosHogar" },
          { text: "Tierra", value: "family.accesoTierra" },
          { text: "Relacion Tierra", value: "family.relacionTenenciaTierra" },
        ],
        data: [],
        name: "Campesino",
        color: "blue",
        title: "Campesino",
      },
    ],
  }),
  methods: {
    fetchAllFamilies: function() {
      this.$store.dispatch(FAMILY_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    sisbenColor: function(sisben) {
      return getColorSisben(sisben);
    },
    setSocios: function() {
      const find = this.masterData.find((m) => m.name == "Todos");
      if (find) {
        find.data = this.families;
      }
    },
    setMujeres: function() {
      const find = this.masterData.find((m) => m.name == "Mujeres");
      if (find) {
        find.data = this.families.filter(
          (f) => f.family?.grupoEtnico.toLowerCase() == "Mujer Rural".toLowerCase()
        );
      }
    },
    setJoven: function() {
      const find = this.masterData.find((m) => m.name == "Jovenes");
      if (find) {
        find.data = this.families.filter(
          (f) => f.family?.grupoEtnico.toLowerCase() == "Joven Rural".toLowerCase()
        );
      }
    },
    setAdultoMayor: function() {
      const find = this.masterData.find((m) => m.name == "AdultoMayor");
      if (find) {
        find.data = this.families.filter(
          (f) => f.family?.grupoEtnico.toLowerCase() == "Adulto mayor".toLowerCase()
        );
      }
    },
    setMujerCabezaFamilia: function() {
      const find = this.masterData.find((m) => m.name == "MujerCabezaFamilia");
      if (find) {
        find.data = this.families.filter(
          (f) => f.family?.grupoEtnico.toLowerCase() == "Madre cabeza familia".toLowerCase()
        );
      }
    },
    setDiscapacitado: function() {
      const find = this.masterData.find((m) => m.name == "Discapacitado");
      if (find) {
        find.data = this.families.filter(
          (f) => f.family?.grupoEtnico.toLowerCase() == "Discapacitado".toLowerCase()
        );
      }
    },
    setHombres: function() {
      const find = this.masterData.find((m) => m.name == "Campesino");
      if (find) {
        find.data = this.families.filter(
          (f) => f.family?.grupoEtnico.toLowerCase() == "Campesinos".toLowerCase()
        );
      }
    },
    handleDownloadExcel: function(master) {
      const workbook = new ExcelJS.Workbook();
      const rows = [];
      master.data.forEach((item) => {
        const row = [];
        this.hedaersExport.map(h=>{
            row.push(item.family[h.key]);
        })
        rows.push(row);
      });
      const worksheetFilter = workbook.addWorksheet(
        `${master.title.toUpperCase()}`
      );
      worksheetFilter.addTable({
        name: "MyTable",
        ref: "A1",
        headerRow: true,
        totalsRow: true,
        columns: this.hedaersExport.map(h=>({name:h.label,filterButton: true})) ,
        rows: rows,
      });
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `CFPREPORT${master.name.toUpperCase()}.xlsx`
        );
      });
    },
  },
  watch: {
    families(val) {
      if (val) {
        this.setSocios();
        this.setMujeres();
        this.setJoven();
        this.setAdultoMayor();
        this.setMujerCabezaFamilia();
        this.setDiscapacitado();
        this.setHombres();
      }
    },
  },
  computed: {
    families() {
      return this.$store.getters.families;
    },
  },
  mounted() {
    this.fetchAllFamilies();
  },
};
</script>
<style>
.v-data-table > .v-data-table__wrapper > table {
  width: 100%;
  min-width: 90vw;
}
</style>
