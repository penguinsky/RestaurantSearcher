<template>
  <div class="main">
    {{ total }}
    {{ perPage }}
  </div>
</template>

<script>
export default {
  props: {
    total: Number, //総件数
    perPage: Number, //1ページの表示件数
  },
}
</script>

<style scoped></style>
