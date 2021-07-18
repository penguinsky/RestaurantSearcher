<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-easybutton/src/easy-button.js'
import 'leaflet-easybutton/src/easy-button.css'
import 'leaflet-toolbar/dist/leaflet.toolbar.js'
import 'leaflet-toolbar/dist/leaflet.toolbar.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

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
      latlng: null,
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
      this.map ??= L.map('map', { center: latlng, zoom: zoom })
      this.setLocation(latlng, zoom)

      //地図画像設定
      this.map.addLayer(
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ',
        })
      )

      //現在地ボタン配置
      L.easyButton('<h>GPS</h>', () => {
        this.setLocationAuto()
      }).addTo(this.map)

      //クリックで位置指定
      this.map.on('click', (e) => {
        this.setLocation(e.latlng)
      })

      //検索ボタン配置
      L.easyButton('<h>🔍</h>', () => {
        this.gotoSearch()
      }).addTo(this.map)
    },
    setLocation(latlng, zoom = 15) {
      if (this.locationMarker == null) {
        this.locationMarker = L.marker(latlng)
        this.map.addLayer(this.locationMarker)
      } else {
        this.locationMarker.setLatLng(latlng)
      }
      this.map.setView(latlng, zoom)
      this.latlng = latlng
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
    gotoSearch() {
      this.$router.push({
        name: 'Search',
        params: { lat: this.latlng.lat, lng: this.latlng.lng },
      })
    },
  },
}
</script>

<style>
html,
body,
#map {
  height: 100%;
}
body {
  margin: 0;
}
</style>
