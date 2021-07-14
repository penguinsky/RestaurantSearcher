<template>
  <div id="app"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  data() {
    return {
      map: null,
      locationMarker: null,
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords
        this.initMap(L.latLng(coords.latitude, coords.longitude), 15)
      },
      () => {
        this.initMap(L.latLng(36, 138), 6) //日本の中心
      },
      { enableHighAccuracy: true }
    )
  },
  methods: {
    initMap(latlng, zoom) {
      this.map ??= L.map('app', { center: latlng, zoom: zoom })
      this.setLocation(latlng, zoom)

      //地図画像設定
      this.map.addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'))

      //現在地ボタン配置
      L.easyButton('GPS', () => {
        this.setLocationAuto()
      }).addTo(this.map)

      //クリックで位置指定
      this.map.on('click', (e) => {
        this.setLocation(e.latlng)
      })
    },
    setLocation(latlng, zoom = 15) {
      if (this.locationMarker == null) {
        this.locationMarker = L.marker(latlng)
        this.map.addLayer(this.locationMarker)
      } else {
        this.locationMarker.setLatLng(latlng)
      }
      this.map.setView(latlng, zoom)
    },
    setLocationAuto() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords
          this.setLocation(L.latLng(coords.latitude, coords.longitude))
        },
        function () {
          //エラー無視
        },
        { enableHighAccuracy: true }
      )
    },
  },
}
</script>

<style>
html,
body,
#app {
  height: 500px;
  width: 500px;
}
body {
  margin: 0;
}
</style>
