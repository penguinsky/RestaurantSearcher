<template>
  <div class="home">
    <Map></Map>
  </div>
</template>

<script>
import Map from '../components/MapForHome.vue'

export default {
  name: 'Home',
  components: {
    Map,
  },
  data() {
    return {
      coords: null,
    }
  },
  watch: {
    coords(newCoords) {
      console.log('Home=', newCoords)
    },
  },
}
</script>
