<template>
  <div class="upload">
    <search-bar></search-bar>
    <Upload />
    <bottomEntry />
  </div>
</template>

<script>
import Upload from '@/components/app/upload/upload'
import bottomEntry from '@/components/app/footer/bottom_entry'
import searchBar from '@/components/app/search_bar'
export default {
  props: {
    id: [String, Number]
  },
  components: {
    Upload,
    bottomEntry,
    searchBar
  }
}
</script>

<style>
</style>
