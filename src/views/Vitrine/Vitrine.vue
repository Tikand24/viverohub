<template>
  <div>
    <v-container>
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in items">
          <v-col :key="i" cols="12" md="3">
            <CardPlant
              :key="`card${i}`"
              :name="item.name"
              :description="item.observation"
              :unitValue="item.unitValue"
              :img="item.image"
              :bag="item.bag"
              :tecnicName="item.tecnicName"
            />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PLANTS_MODULE from "@/store/index";
import { PLANT_GET_ALL } from "@/store/plants";
import CardPlant from "../../components/Plants/CardPlant.vue";
export default {
  name: "Vitrine",
  components: {
    CardPlant,
  },
  data: () => ({}),
  computed: {
    items() {
      return this.$store.getters.plants;
    },
  },
  watch: {},
  methods: {
    fetchAllPlants: function () {
      PLANTS_MODULE.dispatch(PLANT_GET_ALL).catch((error) => {
        console.log("error", error);
      });
    },
    calculateWidth:function(){
        return Math.floor(Math.random() * (6 - 3)) + 3
    }
  },
  mounted() {
    this.fetchAllPlants();
  },
};
</script>

<style>
</style>