<template>
  <div class="main">
    <div class="shops">
      <ShopList :shops="shops"></ShopList>
    </div>
    <Map v-if="loaded" class="map" :lat="lat" :lng="lng" :shops="shops"></Map>
  </div>
</template>

<script>
import axios from 'axios'
import ShopList from '../components/ShopList.vue'
import Map from '../components/Map.vue'

export default {
  name: 'Search',
  components: {
    ShopList,
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
      return Number(this.$route.query.lat)
    },
    lng() {
      return Number(this.$route.query.lng)
    },
  },
  created() {
    this.searchShops()
  },
  methods: {
    searchShops() {
      const queryOptions = {
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
        this.loaded = true
      })
    },
  },
}
</script>

<style>
.main {
  height: 100%;
  width: 100%;
}
.shops {
  display: inline-block;
  vertical-align: top;
  width: 50%;
}
.map {
  height: 100%;
  width: 50%;
  display: inline-block;
}
</style>
