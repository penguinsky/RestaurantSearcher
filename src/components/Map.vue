<template>
  <div id="map2"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  props: {
    lat: {
      type: Number,
      default: 0,
    },
    lng: {
      type: Number,
      default: 0,
    },
    shops: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      map: L.map('map2', { center: L.latLng(this.lat, this.lng), zoom: 15 }),
    }
  },
  created() {
    console.log(this.lat, this.lng, this.shops)
    this.updateMap()
  },
  methods: {
    updateMap() {
      this.map.addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'))
      this.map.addLayer(L.marker([this.lat, this.lng]))
      for (let shop of this.shops) {
        this.map.addLayer(L.marker([shop.lat, shop.lng]))
      }
    },
  },
}
</script>

<style>
html,
body,
#map2 {
  height: 100%;
}
body {
  margin: 0;
}
</style>
