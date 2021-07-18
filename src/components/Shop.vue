<template>
  <div class="main" @click="send">
    <table>
      <tbody>
        <tr>
          <td class="logo_image">
            <img :src="shop.logo_image" />
          </td>
          <td class="info">
            <b class="name">{{ shop.name }}</b>
            <div class="access">{{ shop.access }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    shop: null,
  },
  mounted() {
    console.log(this.shop)
  },
  methods: {
    send() {
      this.$emit('select')
    },
  },
}
</script>

<style scoped>
.main {
  border: black dotted 1px;
  text-align: left;
  width: 100%;
}
.logo_image {
  width: 80px;
  height: 80px;
  padding-right: 3px;
}
.logo_image img {
  height: 100%;
  width: 100%;
}
.info {
  vertical-align: top;
}
.name {
}
</style>
