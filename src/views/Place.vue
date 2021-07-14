<template>
  <div>
    Place
    <button @click="pushed">PushMe</button>
    <router-link to="/access">Access</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    pushed() {
      this.$router.push({
        name: 'Access',
        params: { id: 10 },
      })
    },
  },
}
</script>

<style></style>
