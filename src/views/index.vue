<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div @click="ddd">eee</div>
  </div>
</template>

<script>
export default {
  methods: {
    ddd () {
      this.$router.push({
        name: 'reserve'
      })
    }
  }
}
</script>

<style>
</style>
