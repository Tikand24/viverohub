<template>
  <v-container>
    <v-row class="text-center">
        <v-col cols="12">
          <v-select
            v-model="bag"
            :items="bags"
            label="Bolsa"
            :hint="`Bolsa ${bag.value}, ${bag.peso} kg`"
            item-text="value"
            item-value="value"
            return-object
            single-line
            persistent-hint
          ></v-select>
        </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="quantity"
          :counter="5"
          label="Cantidad"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="description"
          label="Descripcion"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12"
        ><v-btn class="ma-2" outlined color="indigo" @click="addItem()">
          Agregar
        </v-btn>
      </v-col>
      <v-col cols="12"
        ><v-simple-table dense fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Descripcion</th>
                <th class="text-left">Bolsa</th>
                <th class="text-left">Cantidad</th>
                <th class="text-left">Ajuste Kg unidad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td class="text-left">{{ item.description }}</td>
                <td class="text-left">{{ item.bag.value }} <small>{{ `${bag.peso} kg` }}</small></td>
                <td class="text-left">{{ item.quantity }}</td>
                <td class="text-left">
                  <v-text-field
                    sufix="Kg"
                    type="number"
                    v-model="item.adjustment"
                    :counter="5"
                    label="Ajuste"
                    required
                  ></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12"
        ><v-alert type="success">Peso total: {{ kgCalculate }} kg</v-alert
        >
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ textSnackBar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Calculate",
  data: () => ({
    bag: { id: 1, value: "x35", peso: 30 },
    bags: [
      { id: 1, value: "x35", peso: 30 },
      { id: 2, value: "x30", peso: 30 },
      { id: 3, value: "x26", peso: 30 },
      { id: 4, value: "x45", peso: 30 },
      { id: 5, value: "x5", peso: 30 },
    ],
    quantity: 0,
    items: [],
    description:'',
    textSnackBar:''
  }),
  computed: {
    kgCalculate: function () {
      let totalPeso = 0;
      this.items.forEach((i) => {
        totalPeso = totalPeso + i.quantity * (parseInt(i.bag.peso)+parseInt(i.adjustment.length > 0 ? i.adjustment : 0));
      });
      return totalPeso;
    }
  },
  methods: {
    addItem: function () {
      if (!this.bag) {
        this.textSnackBar = "Seleccione bolsa";
        this.snackbar = true;
        return false;
      }
      if (this.quantity.length <= 0) {
        this.textSnackBar = "Seleccione cantidad";
        this.snackbar = true;
        return false;
      }
      this.items.push({
        bag: this.bag,
        quantity: this.quantity,
        adjustment: 0,
        description: this.description
      });
      this.bag = { id: 1, value: "x35", peso: 30 };
      this.quantity = "";
    },
  },
};
</script>

<style>
</style>