<template>
  <div class="main">
    <shop v-for="shop in shops" :key="shop.id" :shop="shop" @select="send(shop.id)"> </shop>
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
  methods: {
    send(id) {
      this.$emit('select', id)
    },
  },
}
</script>

<style scoped></style>
