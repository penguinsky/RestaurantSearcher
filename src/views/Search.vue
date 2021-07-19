<template>
  <div class="main">
    <div class="shops">
      <SearchBox @changeQuery="searchShops($event.keyword, $event.range)" />
      <ShopList :shops="shops" />
      <Pagenation :total="available" :per-page="8" />
    </div>
    <Map v-if="loaded" :shops="shops" class="map" :lat="lat" :lng="lng" />
  </div>
</template>

<script>
import axios from 'axios'
import SearchBox from '../components/SearchBox.vue'
import ShopList from '../components/ShopList.vue'
import Pagenation from '../components/Pagenation.vue'
import Map from '../components/Map.vue'

export default {
  name: 'Search',
  components: {
    SearchBox,
    ShopList,
    Pagenation,
    Map,
  },
  data() {
    return {
      shops: null,
      loaded: false,
      available: 0,
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
  methods: {
    searchShops(keyword, range) {
      const queryOptions = {
        params: {
          lat: this.lat,
          lng: this.lng,
          range: range,
          keyword: keyword,
          key: '92ca24deb4d530bb',
          format: 'json',
        },
      }
      axios.get('/api/hotpepper/gourmet/v1/', queryOptions).then((result) => {
        this.available = result.data.results.results_available
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
  max-width: 600px;
}
.map {
  height: 100%;
  width: 50%;
  display: inline-block;
}
</style>
