<template>
  <div>
    <Map v-if="loaded" :lat="lat" :lng="lng" :shops="shops"></Map>
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
      shops: null,
      loaded: false,
    }
  },
  computed: {
    lat() {
      return Number(this.$route.params.lat)
    },
    lng() {
      return Number(this.$route.params.lng)
    },
  },
  watch: {
    shops(newShops) {
      console.log('newShops=', newShops)
    },
  },
  created() {
    this.searchShops()
    console.log('Search=', this.shops)
  },
  methods: {
    searchShops() {
      ////ぐるなびAPIで店リスト取得
      let queryOptions = {
        params: {
          lat: this.lat,
          lng: this.lng,
          range: 100,
          key: '92ca24deb4d530bb',
          format: 'json',
        },
      }
      axios.get('/api/hotpepper/gourmet/v1/', queryOptions).then((result) => {
        this.shops = result.data.results.shop
        console.log(result.data.results.shop)
        this.loaded = true
      })
    },
  },
}
</script>
