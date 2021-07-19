<template>
  <div class="main">
    <input v-model="keyword" type="search" placeholder="検索文字列" @keydown.enter="send" />
    <button @click="send">検索</button>
    <button v-show="!displayConfig" @click="openConfig">設定</button>
    <button v-show="displayConfig" @click="hideConfig">完了</button>
    <div v-show="displayConfig" class="config">
      <table>
        <tbody>
          <tr>
            <th>半径</th>
            <td>
              <input v-model="range" type="range" min="1" max="5" />
            </td>
            <td>
              {{ meter + 'm' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      range: 1,
      displayConfig: false,
    }
  },
  computed: {
    meter() {
      return [300, 500, 1000, 2000, 3000][this.range - 1]
    },
  },
  mounted() {
    this.send()
  },
  methods: {
    send() {
      this.$emit('changeQuery', {
        keyword: this.keyword,
        range: this.range,
      })
    },
    openConfig() {
      this.displayConfig = true
    },
    hideConfig() {
      this.displayConfig = false
      this.send()
    },
  },
}
</script>

<style scoped>
.main {
  display: inline;
}
.config {
  position: absolute;
  margin-left: 10%;
  width: 30%;
  background-color: white;
  text-align: right;
  border: brown 1px solid;
}
.config table {
  text-align: right;
}
</style>
