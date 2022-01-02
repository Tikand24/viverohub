<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <v-select
          v-model="plant"
          :items="plants"
          label="Producto"
          :hint="`Bolsa ${plant.bag.value}, ${plant.bag.peso} kg`"
          item-text="name"
          item-value="id"
          return-object
          single-line
          persistent-hint
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-text-field
          type="number"
          v-model="quantity"
          :counter="10"
          label="Cantidad"
          required
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" v-if="showPrice">
        <v-text-field
          prefix="$"
          type="number"
          v-model="price"
          :counter="10"
          label="Precio"
          required
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12"
        ><v-btn class="ma-2" outlined color="indigo" @click="addItem()">
          Agregar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { SNACK_SHOW } from "@/store/snackbar";
export default {
  name: "SelectPlant",
  props: ["plants", "showPrice"],
  data: () => ({
    hover: false,
    plant: { bag: { id: null, value: "", peso: 0 } },
    quantity: "",
    price: "",
  }),
  computed: {},
  watch: {
    plant(val) {
      if (val) {
        this.price = val.unitValue;
      }
    },
  },
  methods: {
    addItem: function () {
      if (!this.plant.id) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Seleccione una planta",
          color: "warning",
        });
        return false;
      }
      if (this.quantity.length <= 0) {
        this.$store.commit(SNACK_SHOW, {
          msg: "Seleccione cantidad",
          color: "warning",
        });
        return false;
      }
      if (this.showPrice) {
        if (this.price.length <= 0) {
          this.$store.commit(SNACK_SHOW, {
            msg: "Seleccione precio",
            color: "warning",
          });
          return false;
        }
      }
      this.$emit("onAddItem",{
        plant: this.plant,
        quantity: this.quantity,
        price: this.price,
      });
      this.plant = { bag: { id: null, value: "", peso: 0 } };
      this.quantity = "";
      this.price = "";
    },
  },
  mounted() {},
};
</script>

<style>
</style>