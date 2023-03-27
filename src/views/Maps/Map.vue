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
      <v-card class="pa-2" outlined tile height="100%" width="75%">
        <div ref="mapDiv" style="width: 100%; height: 100%"></div>
      </v-card>
      <v-card
        outlined
        tile
        height="100%"
        width="25%"
        class="pa-2 overflow-y-auto"
        max-height="100%"
      >
        <div class="pa-2">
          <v-chip-group v-model="valueChip" active-class="primary--text" column>
            <v-chip
              filter
              outlined
              key="Localizacion"
              @click="() => showMarkers()"
            >
              Localizacion
            </v-chip>
            <v-chip
              filter
              outlined
              key="delimitacion"
              @click="() => showPoligonMaps()"
            >
              delimitacion
            </v-chip>
            <v-chip
              filter
              outlined
              key="delimitacion"
              @click="() => handleSearchSelected()"
              v-if="itemsSelected.length > 0"
            >
              Buscar {{ itemsSelected.length }} seleccionados
            </v-chip>
          </v-chip-group>
        </div>
        <v-list>
          <v-list-item-group v-model="itemsSelected" multiple color="indigo">
            <v-list-item
              v-for="(associate, i) in associates"
              :key="`${associate.id}${i}`"
              :disabled="
                !(associate.family.latitud && associate.family.longitud)
              "
            >
              <v-list-item-avatar>
                <v-img
                  :src="
                    associate.family.headFamilyGender == 'Mujer'
                      ? imgFarmerFemale
                      : imgFarmerMale
                  "
                  alt="not fouynd"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="associate.family.name"
                ></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-html="`${associate.family.headFamilyFirstName}`"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-html="
                    `Finca: ${associate.family.finca} </br> Telefono: ${associate.family.headFamilyPhone}`
                  "
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { associationMapDraw } from "../../core/Maps/Associations";
import { FAMILY_GET_ALL } from "@/store/masters";
//import CardInfoAssociated from "./CardInfoAssociated.vue";
import imgFarmerMale from "@/assets/farmermale.png"
import imgFarmerFemale from "@/assets/farmerfemale.png"
export default {
  name: "Map",
  //components: { CardInfoAssociated },
  data: () => ({
    markers: [],
    imgFarmerMale:imgFarmerMale,
    imgFarmerFemale:imgFarmerFemale,
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
    valueChip: [],
    flightPath: null,
    itemsSelected: [],
  }),
  computed: {
    associates() {
      return this.$store.getters.families;
    },
  },
  methods: {
    fetchAllFamilies: async function() {
      try {
        await this.$store.dispatch(FAMILY_GET_ALL).catch(() => {});
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleSearchSelected() {
      this.resetMap();
      this.itemsSelected.map((item, i) => {
        this.createMarkerMap(this.associates[item], i);
      });
    },
    createMarkerMap(associate, i) {
      setTimeout(() => {
        const marker = new this.google.maps.Marker({
          position: {
            lat: associate.family.latitud,
            lng: associate.family.longitud,
          },
          map: this.map,
          animation: this.google.maps.Animation.DROP,
        });
        marker.addListener("click", () => {
          this.infoWindow.setOptions({
            content: `<div>
              ${associate.family.name}
              </br>
              Finca: ${associate.family.finca}
              </div>`,
          });
          this.infoWindow.open(this.map, marker);
        });
        this.markers.push(marker);
      }, i * 100);
    },
    showMarkers: function() {
      this.resetMap();
      this.associates.map((associate, i) => {
        if (associate.family) {
          if (associate.family.latitud && associate.family.longitud) {
            this.createMarkerMap(associate, i);
          }
        }
      });
    },
    showPoligonMaps: function() {
      this.resetMap();
      const flightPlanCoordinates = associationMapDraw;
      this.flightPath = new this.google.maps.Polygon({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });
      this.flightPath.setMap(this.map);
    },
    resetMap: function() {
      if (this.flightPath) {
        this.flightPath.setMap(null);
      }
      this.markers.map((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
    },
  },
  mounted() {
    this.fetchAllFamilies();
    const loader = new Loader({
      apiKey: process.env.VUE_APP_apiMapsKey,
      version: "weekly",
    });
    loader
      .load()
      .then((google) => {
        this.google = google;
        this.map = new this.google.maps.Map(this.$refs.mapDiv, this.mapOptions);
        this.infoWindow = new this.google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });
      })
      .catch((e) => {
        console.log("errorData", e);
      });
  },
};
</script>
