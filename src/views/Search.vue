<template>
  <div v-if="shops != null">
    <Map :lat="lat" :lng="lng" :shops="shops"></Map>
    <div v-for="shop in shops" :key="shop.id">{{ shop.name }}<br /></div>
  </div>
</template>

<script>
import axios from 'axios'
import Map from '../components/Map.vue'

export default {
  name: 'Search',
  components: {
    Map,
  },
  data() {
    return {
      lat: null,
      lng: null,
      shops: null,
    }
  },
  created() {
    this.lat = this.$route.params.lat
    this.lng = this.$route.params.lng
    ////ぐるなびAPIで店リスト取得
    let queryOptions = {
      params: {
        lat: this.$route.params.lat,
        lng: this.$route.params.lng,
        range: 100,
        key: '92ca24deb4d530bb',
        format: 'json',
      },
    }
    axios.get('/api/hotpepper/gourmet/v1/', queryOptions).then((result) => {
      this.shops = result.data.results.shop
    })
  },
}
</script>
