<template>
  <div class="main">
    <shop v-for="shop in shops" :key="shop.id" :shop="shop"> </shop>
  </div>
</template>

<script>
import Shop from './Shop.vue'

export default {
  components: {
    Shop,
  },
  props: {
    shops: Array,
  },
}
</script>

<style scoped></style>
