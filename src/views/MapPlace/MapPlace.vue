<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="7" lg="9">
        <div class="container-map">
          <div
            class="cuadrante"
            v-for="(item, index) in map"
            :key="`divCuadrante${index}`"
          >
            <div
              class="column"
              v-for="(item2, index2) in item.cuadrante"
              :key="`divColumn${index2}`"
            >
              <div
                class="item-column"
                v-for="(item3, index3) in item2.column"
                :key="`divItem${index3}`"
              >
                <div
                  class="item"
                  v-for="(item4, index4) in item3.items"
                  :key="`divItemS${index4}`"
                  :style="`background:${item4.color}`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="5" lg="3">
        <div
          class="products-container"
          v-for="(product, index) in products"
          :key="`divProduct${index}`"
        >
          <v-row class="product-row-container">
            <v-col col="8"> {{ product.name }}</v-col>
            <v-col col="2">{{ product.quantity }} </v-col>
            <v-col col="2"
              ><div :style="`background-color:${product.color};`" class="color-container"></div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MapPlace",
  data: () => ({
    place: { cama1: [] },
    map: [],
    colors: ["blue", "green", "purple"],
    products: [
      { name: "Limon", quantity: 510, color: "#DA2CB5" },
      { name: "Limon tahiti", quantity: 19, color: "#D9C9D8" },
      { name: "Palma botella", quantity: 111, color: "#E8DF2A" },
      { name: "Ruda", quantity: 875, color: "#260F5E" },
      { name: "Troncos", quantity: 256, color: "#6D2539" },
      { name: "Crotos", quantity: 244, color: "#C5A80B" },
      { name: "Veranera fina", quantity: 1654, color: "#E97BB5" },
      { name: "VeraneraComún", quantity: 951, color: "#39B1DE" },
      { name: "Rosbery", quantity: 102, color: "#94FA93" },
      { name: "Bugambiles", quantity: 262, color: "#EC0636" },
      { name: "Canastas", quantity: 35, color: "#EC59F9" },
      { name: "Porcelana", quantity: 78, color: "#2F1B96" },
      { name: "Veranera Bolsa 45", quantity: 19, color: "#048FA5" },
    ],
  }),
  methods: {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
  mounted() {
    for (let i = 0; i < 6; i++) {
      this.map.push({
        cuadrante: [],
      });
    }
    this.map.forEach((c) => {
      for (let i = 0; i < 5; i++) {
        c.cuadrante.push({
          column: [],
        });
      }
    });
    this.map.forEach((c) => {
      c.cuadrante.forEach((m) => {
        for (let i = 0; i < 3; i++) {
          m.column.push({ items: [] });
        }
      });
    });
    this.map.forEach((c) => {
      c.cuadrante.forEach((m) => {
        const color = this.colors[this.getRandomInt(0, 4)];
        m.column.forEach((t) => {
          for (let i = 0; i < 20; i++) {
            t.items.push({
              color: color,
              name: "ver",
            });
          }
        });
      });
    });

    console.log("map", this.map);
  },
};
</script>
<style scoped>
.container-map {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid grey;
  min-width: 1030px;
  min-height: 750px;
  max-width: 1030px;
  max-height: 700px;
  overflow: auto;
}
.cuadrante {
  width: 299px !important;
  height: 350px !important;
  display: flex;
  margin: 0px 16px;
  border: 1px solid grey;
}
.map-row {
  display: flex;
}
.item-cama {
  width: 10px;
  height: 10px;
}
.column {
  display: flex;
  width: 59px;
}
.item-column {
  width: 15px;
  margin: 2px;
}
.item {
  display: flex;
  width: 100%;
  height: 12px;
  margin: 5px 1px;
  flex-wrap: wrap;
  border: 1px solid black;
}
.color-container{
  width: 25px;
  height: 25px;
}
</style>
