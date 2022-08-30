<template>
  <div>
    <v-card
      class="d-flex"
      color="grey lighten-2"
      flat
      height="100vh"
      width="100vw"
      tile
    >
      <v-card class="pa-2" outlined tile height="75%" width="75%">
        <div ref="mapDiv" style="width: 100%; height: 100%"></div>
      </v-card>
      <v-card class="pa-2" outlined tile height="25%" width="25%">
        <v-list three-line>
          <template v-for="item in markers">
            <v-list-item :key="item.name">
              <v-list-item-avatar>
                <v-img
                  :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="'ubicacion direccion y telefono'"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="`divider${item.name}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import {
  associationsCoordinates,
  associationMapDraw,
} from "../../core/Maps/Associations";

export default {
  name: "Map",
  data: () => ({
    markers: associationsCoordinates,
    mapOptions: {
      center: {
        lat: 4.4404065,
        lng: -74.3337679,
      },
      zoom: 14,
      mapTypeId: "satellite",
    },
    google: null,
    map: null,
    infoWindow: null,
  }),

  components: {},
  mounted() {
    console.log("data", associationsCoordinates);
    const loader = new Loader({
      apiKey: process.env.VUE_APP_apiMapsKey,
      version: "weekly",
    });
    loader
      .load()
      .then((google) => {
        const flightPlanCoordinates = associationMapDraw;
        this.google = google;
        this.map = new this.google.maps.Map(this.$refs.mapDiv, this.mapOptions);
        this.infoWindow = new this.google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });

        this.markers.map((coord) => {
          const marker = new this.google.maps.Marker({
            position: coord.position,
            map: this.map,
          });
          marker.addListener("click", () => {
            this.infoWindow.setContent(coord.name);
            this.infoWindow.open(this.map, marker);
          });
        });
        const flightPath = new google.maps.Polygon({
          path: flightPlanCoordinates,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
        flightPath.setMap(this.map);
      })
      .catch((e) => {
        console.log("errorData", e);
      });
  },
};
</script>
