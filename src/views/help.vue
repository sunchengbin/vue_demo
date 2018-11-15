<template>
  <div class="upload">
    <search-bar></search-bar>
    <Upload />
    <bottomEntry />
  </div>
</template>

<script>
import Upload from '@/components/upload/upload'
import bottomEntry from '@/components/footer/bottom_entry'
import searchBar from '@/components/search_bar'
export default {
  components: {
    Upload,
    bottomEntry,
    searchBar
  }
}
</script>

<style>
</style>

