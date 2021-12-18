<template>
  <div>
    <v-card class="mx-auto" max-width="344">
      <v-hover v-slot="{ hover }">
        <v-img :src="img">
          <v-expand-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <div>
                <h3>
                  {{ name }}
                </h3>
              </div>
            </v-overlay>
          </v-expand-transition>
        </v-img>
      </v-hover>

      <v-card-text>
        <div class="d-flex justify-space-between">
          <h2 class="text-h5 primary--text">
            {{ name }}
          </h2>
          <h4 class="ml-3">64 ventas</h4>
        </div>
        <template v-if="bag">
          <div>
            <v-icon small color="teal darken-2"> mdi-flower </v-icon>
            {{ `Bolsa ${bag.value}` }}
          </div>
        </template>
        <template v-if="tecnicName && false">
          <div><strong>Nombre tecnico</strong> {{ tecnicName }}</div>
        </template>
        <template v-if="description">
          <div class="mt-1">
            <v-divider></v-divider>
            <p class="mt-1"><strong>Observaciones</strong> {{ description }}</p>
          </div>
        </template>
        <div class="d-flex justify-space-between mt-4">
          <h3 class="text-h4">$ {{ unitValue }}</h3>
          <h5 class="green--text">Disponible</h5>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CardPlant",
  props: ["name", "description", "unitValue", "img", "bag", "tecnicName"],
  data: () => ({
    hover: false,
  }),
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
};
</script>

<style>
</style>