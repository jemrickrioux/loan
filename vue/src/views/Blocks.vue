<template>
  <div class="container">
    <div>
      <SpBlocksTable :blocks='blocks' />
    </div>
  </div>
</template>


<script>
export default {
  name: 'Blocks',
  computed: {
    blocks: function (){
      if (this._depsLoaded) {
        return this.$store.getters['common/blocks/getBlocks'](20)
      } else {
        return []
      }
    },
  }
}
</script>
