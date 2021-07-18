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
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
