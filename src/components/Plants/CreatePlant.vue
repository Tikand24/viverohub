<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <div>Crear Bautismo</div>
        <div>
          <v-btn
            class="mr-2"
            icon
            tile
            color="teal"
            outlined
            @click="closeComponent()"
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
                v-model="plant.nameTecnic"
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
              <v-file-input
                outlined
                v-model="plant.image"
                accept="image/*"
                label="Imagen"
                persistent-hint
                hint="Por favor Selecciona una imagen"
              ></v-file-input>
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
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CreatePlant",
  data: () => ({
    plant: {
      name: "",
      tecnicName: "",
      unitValue: "",
      image: "",
      bag: { id: 1, value: "x35", peso: 30 },
    },
    bags: [
      { id: 1, value: "x35", peso: 30 },
      { id: 2, value: "x30", peso: 30 },
      { id: 3, value: "x26", peso: 30 },
      { id: 4, value: "x45", peso: 30 },
      { id: 5, value: "x5", peso: 30 },
    ],
  }),
  watch: {},
  methods: {
      closeComponent:function(){
          console.log('asdaw')
        this.$emit('close')
      }
  }
};
</script>

<style>
</style>