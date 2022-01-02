<template>
  <div class="create-route-container">
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <div>{{ route.id ? "Editar ruta" : "Crear ruta" }}</div>
          <div>
            <v-btn
              class="mr-2"
              icon
              tile
              color="teal"
              outlined
              @click="route.id ? updateRoute() : saveRoute()"
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
                  v-model="route.name"
                  label="Nombre"
                  persistent-hint
                  hint="Por favor ingresa el nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  v-model="route.code"
                  label="Codigo"
                  persistent-hint
                  hint="Por favor ingresa el codigo"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="route.observation"
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
import { ROUTE_SET, ROUTE_UPDATE } from "@/store/masters";
import { SNACK_SHOW } from "@/store/snackbar";

export default {
  name: "CreateRoute",
  props: ["value"],
  components: {
  },
  data: () => ({
    typeForm: "create",
    route: {
      id: null,
      name: null,
      code: "",
      observation: "",
      status: "Activo"
    },
    loading: false,
  }),
  watch: {
    value(val) {
      if (val) {
        this.route = val;
      }
    }
  },
  computed: {
  },
  methods: {
    resetroute: function () {
      this.route = {
        id: null,
        name: null,
        code: "",
        observation: "",
        status: "Activo"
      };
    },
    closeComponent: function () {
      this.$emit("close");
    },
    saveRoute: async function () {
      this.loading = true;
      const route = this.route;
      route.status = "activo";
      await this.$store
        .dispatch(ROUTE_SET, route)
        .then((response) => {
          console.log("create list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Ruta guardada correctamente",
            color: "success",
          });
          this.$emit("close", this.route);
          this.resetroute();
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
    updateRoute: async function () {
      this.loading = true;
      const route = this.route;
      route.status = "activo";
      await this.$store
        .dispatch(ROUTE_UPDATE, this.route)
        .then((response) => {
          console.log("update list fnc", response);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Ruta Editada correctamente",
            color: "success",
          });
          this.$emit("close", this.route);
          this.resetroute();
        })
        .catch((err) => {
          console.log("err", err);
          this.loading = false;
          this.$store.commit(SNACK_SHOW, {
            msg: "Error al editar la planta",
            color: "error",
          });
        });
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.create-route-container {
  overflow: auto;
}
</style>