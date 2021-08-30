<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-text-field
          v-model="description"
          :counter="10"
          label="Descripcion"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          type="number"
          v-model="quantity"
          :counter="10"
          label="Cantidad"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          prefix="$"
          type="number"
          v-model="price"
          :counter="10"
          label="Precio"
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
                <th class="text-left">Cantidad</th>
                <th class="text-left">Precio</th>
                <th class="text-left">venta</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td class="text-left">{{ item.description }}</td>
                <td class="text-left">{{ item.quantity }}</td>
                <td class="text-left">${{ item.price.toLocaleString("es-ES", formatCurrency) }}</td>
                <td class="text-left">
                  <v-text-field
                    prefix="$"
                    type="number"
                    v-model="item.neto"
                    :counter="10"
                    label="Neto"
                    required
                  ></v-text-field>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12"
        ><v-alert type="success">Venta total: ${{ totalSell.toLocaleString("es-ES", formatCurrency) }}</v-alert
        ><v-alert type="error">Gastos: ${{ totalNeto.toLocaleString("es-ES", formatCurrency) }}</v-alert>
        <v-alert type="warning">Ganancia:${{ totalGanancia.toLocaleString("es-ES", formatCurrency) }} </v-alert>
        <v-alert type="info">Reparto:${{ totalReparto.toLocaleString("es-ES", formatCurrency) }} </v-alert>
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
  name: "HelloWorld",
  data: () => ({
    description: "",
    quantity: "",
    price: "",
    items: [],
    snackbar: false,
    textSnackBar: "",
    formatCurrency: {
      style: "currency",
      currency: "COP",
    },
  }),
  computed: {
    totalSell: function () {
      let totalPrice = 0;
      this.items.forEach((i) => {
        totalPrice = totalPrice + i.quantity * i.price;
      });
      return totalPrice;
    },
    totalNeto: function () {
      let totalNeto = 0;
      this.items.forEach((i) => {
        totalNeto = totalNeto + i.quantity * i.neto;
      });
      return totalNeto;
    },
    totalGanancia: function () {
      let totalGanancia = 0;
      if (this.totalSell != 0) {
        totalGanancia = this.totalSell - this.totalNeto;
      }
      return totalGanancia;
    },
    totalReparto: function () {
      let totalReparto = 0;
      if (this.totalGanancia != 0) {
        totalReparto = this.totalGanancia / 2;
      }
      return totalReparto;
    },
  },
  methods: {
    addItem: function () {
      if (this.quantity.length <= 0) {
        this.textSnackBar = "Seleccione cantidad";
        this.snackbar = true;
        return false;
      }
      if (this.price.length <= 0) {
        this.textSnackBar = "Seleccione precio";
        this.snackbar = true;
        return false;
      }
      this.items.push({
        description: this.description,
        quantity: this.quantity,
        price: this.price,
        neto: 0,
      });
      this.description = "";
      this.quantity = "";
      this.price = "";
    },
  },
};
</script>
