<template>
  <div v-if="coords != null" class="home">
    <router-link to="/search">Search</router-link>
    {{ 'latitude:' + coords.latitude }}<br />
    {{ 'longitude:' + coords.longitude }}<br />
    {{ 'accuracy:' + coords.accuracy }}<br />

    <div v-if="shops != null">
      <Map :lat="coords.latitude" :lng="coords.longitude" :shops="shops"></Map>
      <div v-for="shop in shops" :key="shop.id">{{ shop.name }}<br /></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Map from '../components/Map.vue'

export default {
  name: 'Home',
  components: {
    Map,
  },
  data() {
    return {
      coords: null,
      shops: null,
    }
  },
  watch: {
    coords(newCoords) {
      console.log('Home=', newCoords.latitude, newCoords.longitude)
      if (newCoords == null) {
        return
      }
      ////ぐるなびAPIで店リスト取得
      let queryOptions = {
        params: {
          lat: newCoords.latitude,
          lng: newCoords.longitude,
          range: 100,
          key: '92ca24deb4d530bb',
          format: 'json',
        },
      }
      axios.get('/api/hotpepper/gourmet/v1/', queryOptions).then((result) => {
        this.shops = result.data.results.shop
        console.log(result.data.results.shop)
      })
    },
  },
  created() {
    //緯度経度の取得
    navigator.geolocation.watchPosition(
      function (position) {
        this.coords = position.coords
      }.bind(this),
      function () {
        console.log('エラー')
      },
      { enableHighAccuracy: true }
    )
  },
}
</script>
