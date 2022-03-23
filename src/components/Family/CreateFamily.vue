<template>
  <div class="create-route-container">
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div>{{ family.id ? "Editar familia" : "Crear familia" }}</div>
          <div>
            <v-btn
              class="mr-2"
              icon
              tile
              color="teal"
              outlined
              @click="family.id ? updateFamily() : saveFamily()"
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
              <v-col cols="12" md="12" lg="12">
                <v-text-field
                  outlined
                  v-model="family.name"
                  label="Nombre de la familia"
                  persistent-hint
                  hint="Por favor ingresa el nombre"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >{{ family.headFamilyFirstName }} - Cabeza de la
                    familia</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="family.headFamilyFirstName"
                          label="Nombres "
                          persistent-hint
                          hint="Por favor ingresa los nombres"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="family.headFamilyLastName"
                          label="Apellidos "
                          persistent-hint
                          hint="Por favor ingresa los apellidos"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-select
                          v-model="family.headFamilyTypeId"
                          :items="typeDocs"
                          label="Tipo de documento"
                          item-text="name"
                          item-value="value"
                          return-object
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="family.headFamilyIdentification"
                          label="Identificacion "
                          persistent-hint
                          hint="Por favor ingresa la Identificacion"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="family.headFamilyPhone"
                          label="Numero de celular "
                          persistent-hint
                          hint="Por favor ingresa la Numero de celular"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-select
                          v-model="family.headFamilyRelationship"
                          :items="relationships"
                          label="Parentezco"
                          item-text="name"
                          item-value="value"
                          return-object
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-select
                          v-model="family.headFamilyGender"
                          :items="['Hombre', 'Mujer']"
                          label="Genero"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" lg="12">
                        <v-textarea
                          v-model="family.observation"
                          label="Observacion"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="25"
                          shaped
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel
                  v-for="(member, i) in familyMembers"
                  :key="i"
                >
                  <v-expansion-panel-header
                    ><template v-if="member.firstName.length == 0">
                      Miembro familia
                    </template>
                    <template v-else>
                      {{ member.firstName }} -
                      {{ member.relationship ? member.relationship.name : "" }}
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="member.firstName"
                          label="Nombres "
                          persistent-hint
                          hint="Por favor ingresa los nombres"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="member.lastName"
                          label="Apellidos "
                          persistent-hint
                          hint="Por favor ingresa los apellidos"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-select
                          v-model="member.typeId"
                          :items="typeDocs"
                          label="Tipo de documento"
                          item-text="name"
                          item-value="value"
                          return-object
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="member.identification"
                          label="Identificacion "
                          persistent-hint
                          hint="Por favor ingresa la Identificacion"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-text-field
                          outlined
                          v-model="member.phone"
                          label="Numero de celular "
                          persistent-hint
                          hint="Por favor ingresa la Numero de celular"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-select
                          v-model="member.relationship"
                          :items="relationships"
                          label="Parentezco"
                          item-text="name"
                          item-value="value"
                          return-object
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" lg="6">
                        <v-select
                          v-model="member.gender"
                          :items="['Hombre', 'Mujer']"
                          label="Genero"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="12" lg="12">
                        <v-textarea
                          v-model="member.observation"
                          label="Observacion"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="25"
                          shaped
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="12" lg="12">
                        <v-btn
                          class="mr-2"
                          tile
                          color="red"
                          outlined
                          @click="familyMembers.splice(i, 1)"
                          >Eliminar familiar<v-icon dark
                            >mdi-close</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-btn
                class="mr-2"
                tile
                color="teal"
                outlined
                @click="addFamilyMemberRow()"
                >Agregar familiar<v-icon dark>mdi-plus</v-icon></v-btn
              >
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
import { FAMILY_SET, FAMILY_UPDATE } from "@/store/masters";
import { SNACK_SHOW } from "@/store/snackbar";

export default {
  name: "CreateFamily",
  props: ["value"],
  components: {},
  data: () => ({
    typeForm: "create",
    family: {
      id: null,
      name: "",
      headFamilyFirstName: "",
      headFamilyLastName: "",
      headFamilyTypeId: "",
      headFamilyIdentification: "",
      headFamilyPhone: "",
      headFamilyRelationship: "",
      headFamilyGender: "",
      observation: "",
    },
    familyMembers: [],
    loading: false,
  }),
  watch: {
    value(val) {
      if (val) {
        console.log('valEditar');
      }
    },
  },
  computed: {
    relationships() {
      return [
        { id: 1, name: "Esposo" },
        { id: 2, name: "Esposa" },
        { id: 3, name: "Hijo" },
        { id: 4, name: "Hija" },
        { id: 5, name: "Abuelo" },
        { id: 6, name: "Abuela" },
        { id: 7, name: "Tio" },
        { id: 8, name: "Tia" },
        { id: 9, name: "Otro" },
        { id: 10, name: "Fuera de la linea sanguiniea" },
        { id: 11, name: "No aplica" },
      ];
    },

    typeDocs() {
      return [
        { id: 1, long: "Cedula", name: "CC" },
        { id: 2, long: "Tarjeta de identidad", name: "TI" },
        { id: 3, long: "Registro civil", name: "RC" },
        { id: 4, long: "Otro", name: "NN" },
        { id: 5, long: "No aplica", name: "N/A" },
      ];
    },
  },
  methods: {
    addFamilyMemberRow: function () {
      this.familyMembers.push({
        firstName: "",
        lastName: "",
        typeId: null,
        identification: "",
        phone: "",
        relationship: null,
        observation: "",
        gender: "Hombre",
      });
    },
    resetFamily: function () {
      this.familyMembers = [];
      this.family= {
      id: null,
      name: "",
      headFamilyFirstName: "",
      headFamilyLastName: "",
      headFamilyTypeId: "",
      headFamilyIdentification: "",
      headFamilyPhone: "",
      headFamilyRelationship: "",
      headFamilyGender: "",
      observation: "",
    };
    },
    closeComponent: function () {
      this.$emit("close");
    },
    validFamily: function () {
      if (this.family.name.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Digite el nombre de la familia",
          color: "warning",
        });
        return false;
      }
      if (this.family.headFamilyFirstName.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Digite el nombre del cabeza de hogar",
          color: "warning",
        });
        return false;
      }
      if (this.family.headFamilyTypeId.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Digite tipo de documento del cabeza de hogar",
          color: "warning",
        });
        return false;
      }
      if (this.family.headFamilyIdentification.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Digite la identificacion del cabeza de hogar",
          color: "warning",
        });
        return false;
      }
      if (this.family.headFamilyGender.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Digite el genero del cabeza de hogar",
          color: "warning",
        });
        return false;
      }
      let isValid = true;
      this.familyMembers.forEach((f) => {
        if (f.firstName.length <= 0 || f.gender.length <= 0) {
          isValid = false;
        }
      });
      if (!isValid) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Verifique los datos de nombre y genero de los miembros del hogar",
          color: "warning",
        });
        return false;
      }
      return true;
    },
    saveFamily: async function () {
      if (!this.validFamily()) {
        return false;
      }
      this.loading = true;
      const family = {
        id:null,
        family: this.family,
        familyMembers: this.familyMembers,
      };
      family.status = "activo";
      await this.$store
        .dispatch(FAMILY_SET, family)
        .then((response) => {
          console.log("create list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Familia guardada correctamente",
            color: "success",
          });
          this.$emit("close", this.route);
          this.resetFamily();
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
    updateFamily: async function () {
      if (!this.validFamily()) {
        return false;
      }
      this.loading = true;
      const family = {
        id:null,
        family: this.family,
        familyMembers: this.familyMembers,
      };
      family.status = "activo";
      await this.$store
        .dispatch(FAMILY_UPDATE, this.route)
        .then((response) => {
          console.log("update list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Familia Editada correctamente",
            color: "success",
          });
          this.$emit("close", this.route);
          this.resetFamily();
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
  },
  mounted() {},
};
</script>

<style scoped>
.create-route-container {
  overflow: auto;
}
</style>