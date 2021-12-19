<template>
  <div class="create-plant-container">
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div>{{ plant.id ? "Editar planta" : "Crear planta" }}</div>
          <div>
            <v-btn
              class="mr-2"
              icon
              tile
              color="teal"
              outlined
              @click="plant.id ? updatePlant() : savePlant()"
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
                  v-model="plant.name"
                  label="Nombre comun"
                  persistent-hint
                  hint="Por favor ingresa el nombre comun"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="plant.tecnicName"
                  label="Nombre tecnico"
                  persistent-hint
                  hint="Por favor ingresa el nombre tecnico"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  prefix="$"
                  v-model="plant.unitValue"
                  label="Valor unitario"
                  persistent-hint
                  hint="Por favor ingresa el valor unitario"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-select
                  v-model="plant.bag"
                  :items="bags"
                  label="Bolsa"
                  :hint="`Bolsa ${plant.bag.value}, ${plant.bag.peso} kg`"
                  item-text="value"
                  item-value="value"
                  return-object
                  single-line
                  persistent-hint
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="plant.observation"
                  label="Observacion"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                  shaped
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12">
                <v-file-input
                  outlined
                  v-model="plant.image"
                  accept="image/*"
                  label="Imagen"
                  persistent-hint
                  hint="Por favor Selecciona una imagen"
                ></v-file-input>
              </v-col>
              <v-col cols="12" md="12" v-if="plant.id">
                <v-img :src="plant.imgUrl"></v-img>
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
import { PLANT_SET, PLANT_UPDATE } from "@/store/plants";
import { SNACK_SHOW } from "@/store/snackbar";

export default {
  name: "CreatePlant",
  props: ["value"],
  data: () => ({
    typeForm: "create",
    plant: {
      id: null,
      name: "",
      tecnicName: "",
      unitValue: "",
      image: null,
      imgUrl: null,
      bag: { id: 1, value: "x35", peso: 30 },
      observation: "",
    },
    loading: false,
  }),
  watch: {
    value(val) {
      if (val) {
        this.plant = val;
        this.plant.imgUrl = val.image;
        this.plant.image = null;
      }
    },
  },
  computed: {
    bags() {
      return this.$store.getters.complements.bags;
    },
  },
  methods: {
    resetPlant: function () {
      this.plant = {
        name: "",
        tecnicName: "",
        unitValue: "",
        image: null,
        bag: { id: 1, value: "x35", peso: 30 },
      };
    },
    closeComponent: function () {
      this.$emit("close");
    },
    savePlant: async function () {
      this.loading = true;
      await this.$store
        .dispatch(PLANT_SET, this.plant)
        .then((response) => {
          console.log("create plant fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Planta guardada correctamente",
            color: "success",
          });
          this.$emit("close", this.plant);
          this.resetPlant();
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
    updatePlant: async function () {
      this.loading = true;
      await this.$store
        .dispatch(PLANT_UPDATE, this.plant)
        .then((response) => {
          console.log("update plant fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Planta Editada correctamente",
            color: "success",
          });
          this.$emit("close", this.plant);
          this.resetPlant();
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
};
</script>

<style scoped>
.create-plant-container {
  overflow: auto;
}
</style>