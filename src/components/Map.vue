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
      map: null,
      locationMarker: null,
      shopsLayer: null,
    }
  },
  watch: {
    shops() {
      this.updateMap()
    },
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      //マップ
      this.map = L.map('map2', { center: L.latLng(this.lat, this.lng), zoom: 15 })
      //マップタイル
      this.map.addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'))
      //現在位置
      this.locationMarker = L.marker([this.lat, this.lng])
      this.map.addLayer(this.locationMarker)
      //ショップ位置
      this.shopsLayer = L.layerGroup(this.shops.map((s) => L.marker([s.lat, s.lng])))
      this.map.addLayer(this.shopsLayer)
    },
    updateMap() {
      //現在位置更新
      this.locationMarker.setLatLng([this.lat, this.lng])
      //ショップ位置更新
      this.shopsLayer.remove()
      this.shopsLayer = L.layerGroup(this.shops.map((s) => L.marker([s.lat, s.lng])))
      this.map.addLayer(this.shopsLayer)
    },
  },
}
</script>

<style></style>
